FROM node:10

WORKDIR /fast

COPY package.json .
RUN npm install

COPY . .

CMD ["node", "fast.js"]
