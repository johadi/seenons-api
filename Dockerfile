FROM node:16-alpine3.11

RUN apk add --no-cache dumb-init

ARG NODE_ENV
ENV NODE_ENV ${NODE_ENV}

RUN mkdir -p /usr/app
COPY package.json /usr/app/
WORKDIR /usr/app
RUN npm install

COPY . /usr/app/

ENV PORT 3000
EXPOSE ${PORT}

ENTRYPOINT ["dumb-init"]
CMD ["./entrypoint.sh", "run"]
