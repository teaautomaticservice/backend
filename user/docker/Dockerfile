FROM node:14.9.0-alpine AS development
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/user
COPY ./package.json yarn.lock ./
RUN yarn install --production=false
COPY ./ ./
CMD ["npm", "run", "start:dev"]

FROM node:14.9.0-alpine AS production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/user
COPY ./package.json yarn.lock ./
RUN yarn install --production=true
COPY ./ ./
COPY --from=development ./usr/src/user/dist ./dist
CMD ["npm", "run", "start:prod"]
