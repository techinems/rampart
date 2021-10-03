FROM node:lts-alpine

WORKDIR /var/www/app

COPY . .

RUN npm install

EXPOSE 8080

CMD [ "npm", "run", "build"]