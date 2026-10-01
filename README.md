# Welcome to your Lovable project

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Open your project in the [Lovable editor](https://lovable.dev) and keep building.

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: connect the project to GitHub and every change made in Lovable is committed straight to your repository.
- **Full ownership**: this code is yours. Push to your repository and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Deploy with Docker (Coolify)

The `Dockerfile` builds a standalone Node server (Nitro `node-server` preset) and serves it on port `3000`.

```sh
docker build -t firmground .
docker run -p 3000:3000 firmground
```

In Coolify: create a resource from this repository, choose the **Dockerfile** build pack, and set the exposed port to `3000`. No environment variables are required. The image includes a health check on `/`.

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS
