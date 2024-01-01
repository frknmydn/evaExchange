# 1. Node.js resmi base image'ını kullanarak başlayın
FROM node:latest
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD [ "node", "dist/src/index.js" ]
EXPOSE 3000
