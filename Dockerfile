FROM ruby:3.1.2

RUN apt-get -y update && \
apt-get -y upgrade && \
apt-get -y --force-yes install build-essential tzdata && \
apt-get clean

COPY . /opt/hopsoft/turbo_reflex
WORKDIR /opt/hopsoft/turbo_reflex

VOLUME /usr/local/bundle
RUN rm ./Gemfile.lock && gem update --system && bundle --without test

ENV RAILS_ENV=production
CMD rm -f ./tmp/pids/server.pid && \
rm -f ./Gemfile.lock && \
cd ./test/dummy && \
./bin/rails db:create db:migrate && \
./bin/rails log:clear && \
./bin/rails s --binding=0.0.0.0 --port=3000
