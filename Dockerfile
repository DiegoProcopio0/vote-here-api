FROM node:19.5.0-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY /src /app

CMD ["npm", "start"]
