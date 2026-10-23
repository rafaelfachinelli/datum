# Datum Storybook (apps/storybook), served as a static site by nginx.
# Build context: the repository root (npm workspaces).

FROM node:23-slim AS builder

WORKDIR /app

COPY package.json package-lock.json turbo.json ./
COPY apps/storybook/package.json apps/storybook/package.json
COPY packages/ packages/
RUN npm ci

COPY . .

RUN npx turbo run build --filter=datum-storybook

FROM nginx:1.27-alpine AS production

COPY apps/storybook/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/apps/storybook/storybook-static /usr/share/nginx/html

EXPOSE 80
