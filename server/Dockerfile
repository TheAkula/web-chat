FROM node:18 as base

WORKDIR /app

COPY package*.json .

FROM base as dev

RUN npm install

COPY . .

EXPOSE 4000

FROM base as prod

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN npm install --only=production

COPY . .

COPY --from=dev /server/dist /server/dist

CMD ["node", "dist/main"]