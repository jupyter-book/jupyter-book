FROM jekyll/jekyll:3.8.5
COPY book_template/Gemfile .
RUN apk --update add make gcc g++ libc-dev
RUN gem install bundler
ENTRYPOINT bundle install && bundle exec jekyll serve --host 0.0.0.0