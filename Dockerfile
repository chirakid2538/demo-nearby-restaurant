FROM node:alpine as deps

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --force

FROM node:alpine as builder

WORKDIR /app

COPY . .
COPY --from=deps /app/node_modules ./node_modules

RUN npm run build

FROM node:alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/package.json ./

CMD [ "npm" , "run" , "start:prod" ]