FROM node:alpine

ENV YARN_VERSION 1.16.0

RUN mkdir ~/.npm-global
ENV NPM_CONFIG_PREFIX=~/.npm-global

RUN  apk add --no-cache --virtual .build-deps \
        binutils-gold \
        curl \
        g++ \
        gcc \
        gnupg \
        libgcc \
        linux-headers \
        make

RUN curl -fSLO --compressed "https://yarnpkg.com/downloads/$YARN_VERSION/yarn-v$YARN_VERSION.tar.gz" \
    && tar -xzf yarn-v$YARN_VERSION.tar.gz -C /opt/ \
    && ln -snf /opt/yarn-v$YARN_VERSION /opt/yarn \
    && rm yarn-v$YARN_VERSION.tar.gz

WORKDIR /usr/src/app
COPY ./package.json yarn.lock ./
COPY ./ ./

ADD docker-entrypoint.sh  /bin/docker-entrypoint.sh

ENTRYPOINT ["docker-entrypoint.sh"]