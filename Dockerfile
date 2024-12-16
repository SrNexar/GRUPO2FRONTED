FROM node:21

WORKDIR /usr/src/GRUPO2FRONTED

COPY package*.json ./
RUN npm install

COPY . .

ENTRYPOINT [ "node","server.js"]