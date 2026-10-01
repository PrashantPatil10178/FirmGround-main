# syntax=docker/dockerfile:1

# ---- Build ----------------------------------------------------------------
# Node runs Vite; Bun only installs dependencies from bun.lock.
FROM node:22-bookworm-slim AS build
COPY --from=oven/bun:1.4.2 /usr/local/bin/bun /usr/local/bin/bun
WORKDIR /app

COPY package.json bun.lock bunfig.toml ./
RUN bun install --frozen-lockfile

COPY . .
# The Lovable Vite config targets Cloudflare by default; build a standalone Node server instead.
ENV NITRO_PRESET=node-server
RUN bun run build

# ---- Runtime --------------------------------------------------------------
# The Nitro output bundles its dependencies, so the runtime image needs no node_modules.
FROM node:22-bookworm-slim AS runtime
ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=3000
WORKDIR /app

COPY --from=build --chown=node:node /app/.output ./.output
USER node

EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:' + (process.env.PORT || 3000) + '/').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"

CMD ["node", ".output/server/index.mjs"]
