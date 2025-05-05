FROM node:23-alpine

RUN npm install -g npm

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install -g vite

WORKDIR /var/www/project/frontend

CMD ["npm", "run", "dev"]

EXPOSE 3333
