FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm set-script prepare '' &&  npm install --omit=dev