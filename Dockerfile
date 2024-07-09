FROM node:20-alpine

RUN mkdir /app
WORKDIR /app

COPY package*.json pnpm-lock.yaml* ./
COPY prisma/* ./prisma/
COPY . .

ARG DATABASE_URL
ENV DATABASE_URL "$DATABASE_URL"
ENV NODE_ENV "production"

USER root

RUN npm i -g --unsafe-perm prisma@latest && corepack enable pnpm \
  && pnpm i \
  && chown -R node ./

RUN prisma generate
USER node

RUN npm run build

EXPOSE 4000

CMD ["npm","start"]