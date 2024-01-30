<a href="https://directus.io" target="_blank">

  <h1 align="center">Directus Templates</h1>
</a>

<p align="center">Community maintained Directus instance templates to help you jump start your next project. Apply and extract templates with <a href="https://github.com/directus-community/directus-template-cli"target="_blank">directus-template-cli</a>.
</p>

<p align="center">
  <a href="#introduction"><strong>Introduction</strong></a> ·
  <a href="#using-templates"><strong>🚧 Using Templates</strong></a> ·
  <a href="#%EF%B8%8F-contributing"><strong>❤️ Contributing</strong></a>
</p>
<br/>
<br />

# 🚀 Introduction

## What is a Directus "Template"?
A Directus template is a starter kit or boilerplate for a Directus project. But it could be a full blown application – like [AgencyOS](https://github.com/directus-community/agency-os).

Templates are extracted and applied using the [`directus-template-cli`](https://github.com/directus-community/directus-template-cli) command line utility.

- They're examples of what you can build with Directus
- They're starting points for your next client project
- They're going to save you a boatload of time

## What's Included in a Template?

**Schema / Data Model**
- Schema Snapshot
- Collections
- Fields
- Relations

**Users and Authentication**
- Users
- Roles
- Permissions
- Presets

**Flows**
- Flows
- Operations

**Dashboards**
- Dashboards
- Panels

**Assets**
- Folders
- Files
- Actual Files for Assets

**Sample Content / Data**
- Translations
- Content

---


# **🚧 Using Templates**

To load or use templates you need a Directus instance. Here's a few ways to go about that.

### 1a - Register for a Directus Cloud account

https://directus.cloud/register

This is the easy button. You don’t have to mess with Docker or working out how to deploy a Directus instance at AWS,
Digital Ocean, or similar hosts. A couple of clicks and in less than 2 minutes you’ll have a ready to go Directus
project.

OR

### 1b - Self Host a Directus Instance

If you're prefer to self-host Directus, we highly recommend you do so with Docker. We have several guides on the [Directus docs](https://docs.directus.io/self-hosted/docker-guide.html).

**Important Note**: We (the Directus team) cannot provide support for
self-hosted instances WITHOUT an Enterprise Self-Hosted license or formal support agreement.
[Learn more and contact our team for details on Enterprise Self-Hosted](https://directus.io/pricing/self-hosted).


[PostgreSQL](https://www.postgresql.org/) is the **tested and preferred** database vendor for templates.


### 2 **- Generate a static token for the admin user**

You need the static token to seed the project.

1. Go to the User Directory
2. Choose the Administrative User
3. Scroll down to the Token field
4. Generate token and copy it
5. Save the user (do NOT forget to save because you’ll get an error that shows Invalid token!)

### 3 **- Apply the Template**

Open your terminal, run the following command, and simply follow the prompts.

`npx directus-template-cli@latest apply`

You can load apply templates from three sources.

- Official Templates (maintained in this repo)
- Local directory (files on your local computer)
- GitHub repository (public only)

You can learn more about the
[Directus Template CLI tool here](https://github.com/directus-community/directus-template-cli).

_Note_: It can take a
few minutes for the template script to run if you’re using a remotely hosted Directus instance.

# ❤️ Contributing

This is community driven project so we'd love to have your contributions.

You can extract your own templates using:

`npx directus-template-cli@latest extract`.

Here's how you can contribute:
- [Make a pull request](https://github.com/directus-community/directus-templates/pulls) to add your own template.

## 🙏 Thanks To
Big shout out to [Alex van der Valk (AVDV)](https://github.com/alexvdvalk) for his contributions to this project.
