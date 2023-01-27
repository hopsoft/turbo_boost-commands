FROM ruby:3.1.2

ENV GEM_HOME=/opt/bundle
RUN mkdir -p /opt/bundle /opt/node_modules
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -

RUN apt-get -y update && \
apt-get -y upgrade && \
apt-get -y --allow-downgrades --allow-remove-essential --allow-change-held-packages install \
build-essential \
git \
nodejs \
sqlite3 \
tzdata && \
apt-get clean

# setup ruby gems
RUN gem update --system && \
gem install bundler

# setup yarn
RUN npm install -g yarn

# get application code
RUN rm -rf /opt/turbo_boost-commands
RUN git clone --origin github --branch main --depth 1 https://github.com/hopsoft/turbo_boost-commands.git /opt/turbo_boost-commands

# install application dependencies 1st time
WORKDIR /opt/turbo_boost-commands
RUN ln -s /opt/node_modules /opt/turbo_boost-commands/node_modules
RUN yarn install --ignore-engines
RUN bundle

# cleanup
RUN rm -rf /usr/local/share/.cache/* /usr/local/bundle/cache/* /opt/bundle/cache/* /root/.bundle/cache/* /root/.cache/*

# prepare the environment
ENV RAILS_ENV=production RAILS_LOG_TO_STDOUT=true RAILS_SERVE_STATIC_FILES=true
WORKDIR /

# prepare and run the application
CMD rm -rf /opt/turbo_boost-commands && \
git clone --origin github --branch main --depth 1 https://github.com/hopsoft/turbo_boost-commands.git /opt/turbo_boost-commands && \
cd /opt/turbo_boost-commands/test/dummy && \
ln -s /opt/node_modules /opt/turbo_boost-commands/node_modules && \
yarn install --ignore-engines && \
bundle && \
rm -rf tmp/pids/server.pid /usr/local/share/.cache/* /usr/local/bundle/cache/* /opt/bundle/cache/* /root/.bundle/cache/* /root/.cache/* && \
bin/rails db:create db:migrate && \
bin/rails assets:precompile && \
bin/rails s --binding=0.0.0.0 --port=3000
