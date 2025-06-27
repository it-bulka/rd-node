FROM itbulka/node-base
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY ./src ./src

COPY eslint.config.mjs ./
RUN npm run lint

EXPOSE 3000
CMD ["npm", "run", "dev"]