FROM node:lts-alpine AS base
WORKDIR /usr/src/app
COPY ./package.json yarn.lock ./

FROM base AS development
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
RUN yarn install
COPY ./ ./

FROM base AS production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
RUN yarn global add @nestjs/cli
RUN yarn install
COPY ./ ./
RUN yarn build
