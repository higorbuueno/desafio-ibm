FROM node:20

WORKDIR /usr/src/app

COPY . .
RUN npm install -g npm
RUN npm install -g @angular/cli@17

RUN npm cache clean --force
RUN rm -rf node_modules
RUN rm -f package-lock.json

RUN npm install

EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0"]