FROM ruby:3.1.2

RUN apt-get -y update && \
apt-get -y upgrade && \
apt-get -y --allow-downgrades --allow-remove-essential --allow-change-held-packages install \
build-essential \
git \
nodejs \
npm \
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
RUN rm -rf /opt/turbo_reflex
RUN git clone --origin github --branch main --depth 1 https://github.com/hopsoft/turbo_reflex.git /opt/turbo_reflex

# install application dependencies 1st time
WORKDIR /opt/turbo_reflex
RUN yarn
RUN bundle

# prepare the environment
ENV RAILS_ENV=production RAILS_LOG_TO_STDOUT=true RAILS_SERVE_STATIC_FILES=true

# prepare and run the application
CMD git pull --no-rebase github main && \
cd yarn && \
cd test/dummy && \
bundle && \
rm -f tmp/pids/server.pid && \
bin/rails db:create db:migrate && \
bin/rails assets:clobber && \
bin/rails assets:precompile && \
bin/rails s --binding=0.0.0.0 --port=3000
