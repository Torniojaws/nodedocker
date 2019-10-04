# docker-compose.yml

version: '3.7'
services:
  db:
    image: mysql:5.7
    environment:
      MYSQL_ROOT_PASSWORD: 'yesyesnono'
    command: --disable-partition-engine-check
    restart: always
  server:
    image: testing:1.0
    build:
      context: .
      dockerfile: Dockerfile
    environment:
      DB_HOST: db
      DB_PORT: '3306'
      DB_USER: 'root'
      DB_PASSWORD: 'yesyesnono'
    ports:
      - "3005:3005"
    depends_on:
      - db
      
# dockerfile

FROM node:12
WORKDIR /srv/test
RUN apt update && apt -y install mysql-client
COPY package.json .
COPY index.js .
RUN npm install
ENTRYPOINT node index