FROM node:12
WORKDIR /srv/nodedocker/
COPY apps/ ./apps/
COPY libs/ ./libs/
COPY index.js ./
COPY package.json ./
COPY routes.js ./
RUN npm install --production

ENTRYPOINT npm start