FROM node:18-alpine

RUN mkdir /app
WORKDIR /app

COPY package*.json pnpm-lock.yaml* ./
COPY prisma/schema* ./prisma/

ARG DATABASE_URL
ENV DATABASE_URL "$DATABASE_URL"
ENV NODE_ENV "production"

USER root

RUN corepack enable pnpm \
  && pnpm i --frozen-lockfile  \
  && pnpm cache clean --force \
  && chown -R node ./

RUN pnpx prisma generate
USER node

RUN pnpm run build

COPY ./dist .

EXPOSE 4000

CMD ["pnpm","start"]