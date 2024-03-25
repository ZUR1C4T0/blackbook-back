# Build Stage
FROM oven/bun:1-alpine as builder
WORKDIR /usr/app
COPY package.json bun.lockb ./
COPY tsconfig*.json nest-cli.json ./
COPY ./src ./src
RUN bun install --frozen-lockfile --silent
RUN bun run build

# Production Stage
FROM oven/bun:1-alpine
WORKDIR /usr/app
COPY --from=builder /usr/app/package.json /usr/app/bun.lockb ./
COPY --from=builder /usr/app/dist ./dist
RUN bun install --frozen-lockfile --production
CMD ["bun", "run", "prod"]
