FROM ruby:3.1.2

RUN apt-get -y update && \
apt-get -y upgrade && \
apt-get -y --force-yes install build-essential sqlite3 tzdata && \
apt-get clean

COPY . /opt/turbo_reflex
WORKDIR /opt/turbo_reflex/test/dummy

VOLUME /usr/local/bundle

RUN gem update --system && \
gem install bundler && \
rm -f Gemfile.lock && \
bundle --without test && \
bundle update --bundler && \
bundle lock --add-platform x86_64-linux && \
bundle --without test

ENV RAILS_ENV=production
CMD rm -f tmp/pids/server.pid && \
bin/rails db:create db:migrate && \
bin/rails log:clear && \
bin/rails assets:clobber && \
bin/rails assets:precompile && \
bin/rails s --binding=0.0.0.0 --port=3000
