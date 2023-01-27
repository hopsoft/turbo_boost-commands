FROM ruby:3.1.2

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
gem install bundler && \
bundle config set --global --without test

# setup yarn
RUN npm install -g yarn

# get application code
RUN rm -rf /opt/turbo_boost-commands
RUN git clone --origin github --branch main --depth 1 https://github.com/hopsoft/turbo_boost-commands.git /opt/turbo_boost-commands

# install application dependencies 1st time
WORKDIR /opt/turbo_boost-commands
RUN yarn install --ignore-engines
RUN bundle

# prepare the environment
ENV RAILS_ENV=production RAILS_LOG_TO_STDOUT=true RAILS_SERVE_STATIC_FILES=true

# prepare and run the application
CMD git pull --depth 1 --force --no-rebase github main && \
yarn install --ignore-engines && \
cd test/dummy && \
bundle && \
rm -f tmp/pids/server.pid && \
bin/rails db:create db:migrate && \
bin/rails assets:clobber && \
bin/rails assets:precompile && \
bin/rails s --binding=0.0.0.0 --port=3000
