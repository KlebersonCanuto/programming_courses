FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN apk update && apk add bash
RUN apk add --update python3
RUN npm install --production

COPY . .
RUN mkdir tmp

EXPOSE 8080
CMD ["node", "server.js" ]