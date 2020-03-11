FROM node:10.19.0-alpine

WORKDIR /fast

COPY package.json .
RUN npm install
