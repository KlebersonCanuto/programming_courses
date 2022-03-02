FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN apk update && apk add bash
RUN npm install --production

COPY . .
RUN mkdir tmp
RUN mkdir logs

EXPOSE 8080
CMD ["node", "server.js" ]