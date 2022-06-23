FROM node:18 as base

WORKDIR /app
FROM base as dev
ENV NODE_ENV=development

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

FROM base as prod
ENV NODE_ENV=production

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD [ "node", "prod/index.js" ]