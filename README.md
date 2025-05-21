
# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/9f7ab4f6-90a7-4ee5-a946-73702d8a5a61

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/9f7ab4f6-90a7-4ee5-a946-73702d8a5a61) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

## Docker Deployment

You can deploy this application using Docker and Docker Compose. Below is an example `docker-compose.yml` configuration:

```yaml
version: '3.8'

services:
  upcomerr:
    build: .
    container_name: upcomerr
    restart: unless-stopped
    ports:
      - "3000:80"  # Map container port 80 to host port 3000
    volumes:
      - upcomerr_data:/app/data  # Persist settings data

volumes:
  upcomerr_data:  # Volume for persistent data storage
```

To deploy with Docker Compose:

1. Save this configuration as `docker-compose.yml`
2. Run `docker-compose up -d` to start the container
3. Access the application at `http://localhost:3000`

To deploy with Portainer:
1. Navigate to Stacks → Add Stack
2. Choose "Web editor" as build method
3. Paste the above YAML
4. Name your stack "upcomerr" (or preferred name)
5. Click "Deploy the stack"

**Note:** For this Docker setup to work properly, you'll need to add a Dockerfile to your repository.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/9f7ab4f6-90a7-4ee5-a946-73702d8a5a61) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
