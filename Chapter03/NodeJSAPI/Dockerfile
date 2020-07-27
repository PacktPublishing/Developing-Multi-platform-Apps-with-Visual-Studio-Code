FROM node:10.13-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN apk --no-cache --virtual build-dependencies add \
    python \
    bash \
    make \
    g++ \
    && npm install \
    && apk del build-dependencies

EXPOSE 3001
CMD npm start