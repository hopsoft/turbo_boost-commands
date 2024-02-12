FROM ruby:3.0.3-slim-bullseye

RUN apt-get -y update && \
apt-get -y --no-install-recommends install \
build-essential \
curl \
libjemalloc2 \
sqlite3 \
tzdata

RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
RUN apt-get -y --no-install-recommends install nodejs

RUN apt-get clean
RUN gem update --system
RUN bundle config set --local clean 'true'

RUN mkdir -p /mnt/external/node_modules /mnt/external/gems /mnt/external/database

COPY . /app
WORKDIR /app
CMD bin/docker/run/remote
