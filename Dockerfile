FROM node:16-alpine3.11

RUN apk add --no-cache dumb-init

# The NODE_ENV and CURRENT_GIT_SHA build arguments are required.  They are set
# as ENV vars in the container to be picked up by the running app.
ARG NODE_ENV
ENV NODE_ENV ${NODE_ENV}

RUN mkdir -p /usr/app
COPY package.json /usr/app/
WORKDIR /usr/app
RUN npm install

COPY . /usr/app/

# The node app's bin/www script will pick up $PORT from here.
ENV PORT 7000
EXPOSE ${PORT}

ENTRYPOINT ["dumb-init"]
CMD ["./entrypoint.sh", "run"]
