FROM node:12-alpine3.11

# add bash
RUN apk update
RUN apk upgrade
RUN apk add bash

WORKDIR /app
# https://stackoverflow.com/a/32785014/232619
COPY . /app
RUN npm install

RUN npm install -g nodemon

EXPOSE 3000

# CMD ["npm", "start"]

CMD ["nodemon","server.js"]