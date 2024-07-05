FROM node:20

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 8080

CMD [ "npm", "run", "start:dev" ]