FROM node:20-alpine

WORKDIR /app

COPY package.json ./

RUN npm install --production

COPY server.js ./server.js

ENV PORT=4000
# Default Mongo URL can be overridden at runtime
ENV MONGODB_URI="mongodb://pearl_path_user:QFvBV5Vk7v0TTZwzmKcw@pearl-path-database-12yohc:27017"

EXPOSE 4000

CMD ["npm", "start"]

