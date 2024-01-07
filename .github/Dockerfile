ARG RUBY_VERSION=3.3

FROM ruby:${RUBY_VERSION}-slim-bullseye

RUN apt-get -y update && apt-get -y --no-install-recommends install \
  build-essential \
  curl \
  libjemalloc2 \
  sqlite3 \
  tzdata

RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
  && apt-get -y --no-install-recommends install nodejs \
  && npm install -g npm@latest yarn \
  && yarn global add playwright@1.40.1 \
  && playwright install-deps \
  && playwright install \
  && apt-get clean \
  && gem update --system \
  && bundle config set --local clean 'true'

RUN bundle \
  && yarn --frozen-lockfile \
  && yarn autoclean --force

CMD rake
