# 1. Development stage
FROM node:18-alpine as dev
WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
RUN npm i -g typescript && npm i -g pnpm && pnpm install --frozen-lockfile

COPY tsconfig.json demo.ts ./
COPY src ./src
ENV NODE_ENV=development
EXPOSE 3000
CMD ["pnpm", "dev"]

# 2. Build stage
FROM dev AS build
RUN pnpm run build

# 3. Production stage
FROM node:18-alpine as prod
WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
RUN npm i -g pnpm && pnpm install --frozen-lockfile --prod
COPY --from=build /app/dist ./dist
ENV NODE_ENV=production
EXPOSE 3000
CMD ["pnpm", "start"]
