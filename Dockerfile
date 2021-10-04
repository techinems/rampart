FROM node:lts-alpine

RUN apk --no-cache add git

WORKDIR /var/www/app

COPY . .

RUN npm install

EXPOSE 8080

CMD [ "npm", "run", "build"]