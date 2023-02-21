ARG NODE_VERSION=16
ARG ALPINE_VERSION=3.14

FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION}

WORKDIR /app

RUN apk update

COPY package*.json ./
RUN npm ci

COPY ./ .
RUN npm run build

EXPOSE 3000

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

CMD ["npm", "run", "preview"]
