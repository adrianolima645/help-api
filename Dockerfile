FROM node:17.4.0
WORKDIR /api
COPY package.json .
RUN yarn install
COPY . .
RUN yarn build
EXPOSE 5000/tcp
RUN yarn watch-ts
CMD ["yarn", "run", "watch-node"]
CMD ["yarn", "run", "watch-ts"]

