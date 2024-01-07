ARG RUBY_VERSION=placeholder

FROM ruby:${RUBY_VERSION}-slim-bullseye AS base
RUN apt-get -y update && apt-get -y --no-install-recommends install \
build-essential \
curl \
libjemalloc2 \
sqlite3 \
tzdata

FROM base AS node
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
apt-get -y --no-install-recommends install nodejs && \
npm install -g npm@latest yarn

FROM node AS playwright
RUN yarn global add playwright && \
playwright install-deps && \
playwright install

FROM playwright AS final
COPY ../ /app
WORKDIR /app
RUN gem update --system
RUN bundle && bundle clean --force
RUN yarn --frozen-lockfile && yarn autoclean --force
RUN apt-get clean

CMD rake
