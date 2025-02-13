#!/bin/bash

# Set default variables
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
DEFAULT_PREFIX="directus"
DUMPS_DIR="dumps"
DOCKER_COMPOSE_DIR="."

# Function to display usage
usage() {
    echo "Usage: $0 [-d <docker-compose-directory>]"
    echo "  -d    Specify the directory containing docker-compose.yml (default: current directory)"
    echo "  -h    Display this help message"
}

# Parse command line options
while getopts ":d:h" opt; do
    case ${opt} in
        d )
            DOCKER_COMPOSE_DIR=$OPTARG
            ;;
        h )
            usage
            exit 0
            ;;
        \? )
            echo "Invalid option: $OPTARG" 1>&2
            usage
            exit 1
            ;;
        : )
            echo "Invalid option: $OPTARG requires an argument" 1>&2
            usage
            exit 1
            ;;
    esac
done

# Check if DOCKER_COMPOSE_DIR exists
if [ ! -d "$DOCKER_COMPOSE_DIR" ]; then
    echo "Error: Directory $DOCKER_COMPOSE_DIR does not exist."
    exit 1
fi

# Convert DOCKER_COMPOSE_DIR to absolute path
DOCKER_COMPOSE_DIR=$(cd "$DOCKER_COMPOSE_DIR" && pwd)

echo "Using directory: $DOCKER_COMPOSE_DIR"

# Function to get dump name
get_dump_name() {
    local prefix
    read -p "Enter a name for the dump (default: $DEFAULT_PREFIX): " prefix
    prefix=${prefix:-$DEFAULT_PREFIX}
    echo "${prefix}_dump_${TIMESTAMP}"
}

# Ensure dumps directory exists
mkdir -p "$DOCKER_COMPOSE_DIR/$DUMPS_DIR"

DUMP_FOLDER="$DOCKER_COMPOSE_DIR/$DUMPS_DIR/$(get_dump_name)"
DUMP_FILE="${DUMP_FOLDER}/${DUMP_FOLDER##*/}.sql"
COMPRESSED_DUMP_FILE="${DUMP_FILE}.gz"
UPLOADS_FOLDER="${DUMP_FOLDER}/uploads"

# Try to find docker-compose.yml
if [ -f "$DOCKER_COMPOSE_DIR/docker-compose.yml" ]; then
    DOCKER_COMPOSE_FILE="$DOCKER_COMPOSE_DIR/docker-compose.yml"
elif [ -f "$DOCKER_COMPOSE_DIR/docker-compose.yaml" ]; then
    DOCKER_COMPOSE_FILE="$DOCKER_COMPOSE_DIR/docker-compose.yaml"
else
    echo "Error: Cannot find docker-compose.yml or docker-compose.yaml in the specified directory."
    echo "Searching in: $DOCKER_COMPOSE_DIR"
    echo "Current working directory: $(pwd)"
    exit 1
fi

# Function to check if docker compose is running
check_docker_compose() {
    if ! docker compose -f "$DOCKER_COMPOSE_FILE" ps --format json | grep -q '"Service":"database"'; then
        echo "Error: Docker Compose services are not running. Please start them first."
        exit 1
    fi
}

# Function to create dump folder
create_dump_folder() {
    echo "Creating dump folder: $DUMP_FOLDER"
    mkdir -p "$DUMP_FOLDER"
    mkdir -p "$UPLOADS_FOLDER"
}

# Function to create database dump
create_db_dump() {
    echo "Creating database dump..."
    if docker compose -f "$DOCKER_COMPOSE_FILE" exec database pg_dump -U directus -d directus > "$DUMP_FILE"; then
        echo "Database dump created successfully: $DUMP_FILE"
    else
        echo "Error: Failed to create database dump"
        exit 1
    fi
}

# Function to dump assets
dump_assets() {
    echo "Dumping assets from uploads folder..."

    # Create a temporary directory for the initial copy
    TMP_UPLOADS="${DUMP_FOLDER}/tmp_uploads"
    mkdir -p "$TMP_UPLOADS"

    if docker compose -f "$DOCKER_COMPOSE_FILE" cp directus:/directus/uploads/. "$TMP_UPLOADS"; then
        echo "Assets copied to temporary folder."

        # Use find to copy only the original files to the final uploads folder
        find "$TMP_UPLOADS" -type f ! -name '*__*' -exec cp {} "$UPLOADS_FOLDER/" \;

        # Remove the temporary directory
        rm -rf "$TMP_UPLOADS"

        echo "Original assets dumped successfully to: $UPLOADS_FOLDER"
    else
        echo "Error: Failed to dump assets"
        exit 1
    fi
}

# Function to compress dump
compress_dump() {
    echo "Compressing dump file..."
    if [ -f "$DUMP_FILE" ]; then
        if gzip -f "$DUMP_FILE"; then
            echo "Dump compressed successfully: $COMPRESSED_DUMP_FILE"
        else
            echo "Error: Failed to compress dump"
            exit 1
        fi
    else
        echo "Error: Dump file not found: $DUMP_FILE"
        exit 1
    fi
}

# Main execution
check_docker_compose
create_dump_folder
create_db_dump
dump_assets

read -p "Do you want to compress the database dump file? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    compress_dump
fi

echo "Dump process completed. All files are in the folder: $DUMP_FOLDER"
