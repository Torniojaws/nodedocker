FROM node:12
WORKDIR /srv/nodedocker/
COPY apps/ ./apps/
COPY index.js ./
COPY package.json ./
COPY routes.js ./
RUN npm install --production

EXPOSE 3000
ENTRYPOINT npm start