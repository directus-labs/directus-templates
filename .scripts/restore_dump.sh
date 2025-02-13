#!/bin/bash

DUMPS_DIR="dumps"

# Function to list available dumps
list_dumps() {
    echo "Available dumps:"
    ls -d $DUMPS_DIR/*_dump_* 2>/dev/null | sed "s|$DUMPS_DIR/||" | cat -n
}

# Function to select a dump
select_dump() {
    list_dumps
    if [ $? -ne 0 ]; then
        echo "No dumps found in the $DUMPS_DIR directory."
        exit 1
    fi
    read -p "Enter the number of the dump you want to restore: " dump_number
    selected_dump=$(ls -d $DUMPS_DIR/*_dump_* | sed -n "${dump_number}p")
    if [ -z "$selected_dump" ]; then
        echo "Invalid selection."
        exit 1
    fi
    echo "Selected dump: $selected_dump"
}

# Function to restore database
restore_database() {
    local dump_file
    local dump_name=$(basename "$selected_dump")
    if [ -f "${selected_dump}/${dump_name}.sql.gz" ]; then
        dump_file="${selected_dump}/${dump_name}.sql.gz"
        echo "Restoring compressed database dump..."
        gunzip -c "$dump_file" | docker compose exec -T database psql -U directus -d directus
    elif [ -f "${selected_dump}/${dump_name}.sql" ]; then
        dump_file="${selected_dump}/${dump_name}.sql"
        echo "Restoring uncompressed database dump..."
        docker compose exec -T database psql -U directus -d directus < "$dump_file"
    else
        echo "Error: No database dump file found in $selected_dump"
        return 1
    fi

    if [ $? -eq 0 ]; then
        echo "Database restored successfully."
    else
        echo "Error: Failed to restore database."
        return 1
    fi
}

# Function to restore uploads
restore_uploads() {
    if [ -d "${selected_dump}/uploads" ]; then
        echo "Restoring uploads..."
        docker compose cp "${selected_dump}/uploads/." directus:/directus/uploads/
        if [ $? -eq 0 ]; then
            echo "Uploads restored successfully."
        else
            echo "Error: Failed to restore uploads."
            return 1
        fi
    else
        echo "No uploads folder found in $selected_dump"
    fi
}

# Main execution
select_dump

read -p "Do you want to restore the database? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    restore_database
fi

read -p "Do you want to restore the uploads? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    restore_uploads
fi

echo "Restore process completed."
