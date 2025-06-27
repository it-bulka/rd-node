FROM itbulka/node-base
WORKDIR /usr/src/app
COPY package.json .
COPY package-lock.json .
RUN npm ci --omit=dev

COPY ./src ./src
EXPOSE 4000
CMD ["node","src/server.js"]