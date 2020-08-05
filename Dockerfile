FROM node:lts-alpine

WORKDIR /var/www/app

COPY . .

EXPOSE 8080

CMD [ "npm", "run", "watch"]