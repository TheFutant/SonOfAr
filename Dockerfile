# syntax=docker/dockerfile:1.7

# ── build ────────────────────────────────────────────────────────────────────
FROM node:20-alpine AS build
WORKDIR /app

# Install deps with cache-friendly layering
COPY package.json package-lock.json* ./
# package-lock may not exist on first build — fall back to `npm install`.
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

# Copy source and build
COPY . .
RUN npm run build

# ── runtime ──────────────────────────────────────────────────────────────────
FROM nginx:1.27-alpine AS runtime

# Replace the default site config with our SPA-aware one
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built static assets
COPY --from=build /app/dist /usr/share/nginx/html

# nginx listens on 80 inside the container; compose maps host port to 80.
EXPOSE 80

# Lightweight healthcheck so `docker compose ps` reports health.
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/healthz >/dev/null 2>&1 || exit 1

CMD ["nginx", "-g", "daemon off;"]
