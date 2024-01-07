ARG RUBY_VERSION=3.3

FROM ruby:${RUBY_VERSION}-slim-bullseye AS base
RUN apt-get -y update && apt-get -y --no-install-recommends install \
  build-essential \
  chromium \
  curl \
  libjemalloc2 \
  sqlite3 \
  tzdata

FROM base AS node
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
  && apt-get -y --no-install-recommends install nodejs \
  && npm install -g npm@latest yarn

FROM node AS playwright
RUN yarn global add playwright@1.40.1 \
  && playwright install-deps

FROM playwright AS final
RUN apt-get clean \
  && gem update --system \
  && bundle config set --local clean 'true' \
  && bundle \
  && yarn --frozen-lockfile \
  && yarn autoclean --force

CMD rake
