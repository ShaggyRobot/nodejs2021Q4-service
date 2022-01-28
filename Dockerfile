FROM node:16.13.1-alpine3.14
WORKDIR /docker/app
COPY package.json .
RUN npm install --production
# RUN npm install nodemon
COPY . .
EXPOSE 4000
CMD ["npm", "start"]
# CMD ["npm", "generate"]


# ts-node ./node_modules/typeorm/cli.js migration:generate -n migName -p