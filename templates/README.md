# Starter Templates with Directus Integration

This repo provides a collection of starter templates for building web applications with Directus integration. Initially, this includes a **Simple CMS**, but upcoming templates will also include **Simple CRM** and **Simple eCommerce** solutions.

Each template is designed to be:

- **Reusable**: Modular codebases that can be easily extended.
- **Framework-Specific**: Tailored implementations for popular frameworks like Next.js, Nuxt.js, Svelte, and Astro.
- **Scalable**: Suitable for small to medium projects and scalable to larger applications.

---

## **Current and Upcoming Templates**

| Template             | Status         | Description                                  |
| -------------------- | -------------- | -------------------------------------------- |
| **Simple CMS**       | 🚧 In Progress | A starter CMS template for managing content. |
| **Simple CRM**       | 🕒 Upcoming    | A CRM template for managing customer data.   |
| **Simple eCommerce** | 🕒 Upcoming    | A template for building eCommerce solutions. |

---

## **Getting Started**

### **Using Directus with a Cloud Instance (Recommended)**

1. **Create a New Project**:

   - Visit [Directus Cloud](https://directus.io/cloud/) and create a new project.
   - During the setup process, be sure to select the appropriate template for your project (**Simple CMS**, **Simple CRM**, or **Simple eCommerce**).
   - Once started, it will take around 90 seconds for the Cloud Project to be created.
   - You will receive an email with your project URL, email, and password for logging in.
   - If you used GitHub to create your account, this will be your GitHub email.

2. **Access Your New Project**:

   - Log in to your project using the URL provided in your email or from the Directus Cloud Dashboard.

3. **Select a Template**:
   - Navigate to the folder for the framework you want to use in this repo.
   - Follow the instructions in that template's README to set up your application and connect it to your cloud instance.

---

### **Using Directus Locally**

For local development, follow these steps:

1. **Install Docker**:

   - Ensure Docker is installed and running on your machine: [Download Docker](https://www.docker.com/products/docker-desktop).

2. **Clone the Template You Want**:

   - Select the template folder for your chosen framework (e.g., `simple-cms`) and clone it:
     ```bash
     git clone https://github.com/your-org/starters.git simple-cms
     cd simple-cms
     ```

3. **Navigate to the `directus/` Folder**:

   - Inside your cloned template folder, navigate to the `directus/` folder:
     ```bash
     cd directus
     ```

4. **Start Directus**:

   - Run Docker Compose to start the Directus instance:

     ```bash
     docker-compose up -d
     ```

   - This will start Directus on [http://localhost:8055](http://localhost:8055). Use the following credentials to log in:
     - **Admin Email**: `admin@example.com`
     - **Admin Password**: `d1r3ctu5`

5. **Apply a Template**:

   - Use the [Directus Template CLI](https://github.com/directus-labs/directus-template-cli) to apply a pre-configured template for your project. Follow these steps:

     1. \*\*Generate a static token for the admin user:

        - Go to the **Users Directory**
        - Choose the Administrative User
        - Scroll down to the **Token** field and generate a static token.
        - Copy the token and save it. **Do not forget to save the user**, or you will encounter an "Invalid token" error.

     2. **Run the Template CLI Tool**:

        - Open your terminal, run the following command, and follow the prompts:
          ```bash
          npx directus-template-cli@latest apply
          ```

     3. **Follow the Prompts**:

        - Choose `Community templates`
        - Select the template from the list to apply (**Simple Website CMS**, **Simple CRM**, or **Simple eCommerce**)
        - Fill in your Directus URL
          ```bash
          http://localhost:8055
          ```
        - Select `Directus Access Token`
        - Fill in the token you saved from Step 1

---
