FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache netcat-openbsd

COPY . .

RUN npm i

EXPOSE 3001

CMD ["npm","start"]

