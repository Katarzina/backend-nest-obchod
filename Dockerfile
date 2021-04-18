FROM node:14.3-alpine As development

WORKDIR /usr/src/app

ENV TZ 'Europe/Prague'
RUN apk add tzdata && \
    cp /usr/share/zoneinfo/$TZ /etc/localtime && \
    echo $TZ > /etc/timezone \
    echo date && \
    apk del tzdata

COPY package.json /usr/src/app
COPY yarn.lock /usr/src/app

RUN yarn install --only=development

COPY . .



RUN yarn run build

FROM node:14.3-alpine As production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ENV TZ 'Europe/Kiev'
RUN apk add tzdata && \
    cp /usr/share/zoneinfo/$TZ /etc/localtime && \
    echo $TZ > /etc/timezone \
    echo date && \
    apk del tzdata

WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY yarn.lock /usr/src/app

RUN yarn install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
