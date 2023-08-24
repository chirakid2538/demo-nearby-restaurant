FROM node:alpine as deps

WORKDIR /frontend

COPY package.json package-lock.json ./

RUN npm install --force

FROM node:alpine as builder

WORKDIR /frontend

COPY . .
COPY --from=deps /frontend/node_modules ./node_modules

RUN npm run build

FROM node:alpine

WORKDIR /frontend

COPY --from=builder /frontend/node_modules ./node_modules
COPY --from=builder /frontend/.output ./.output
COPY --from=builder /frontend/.nuxt ./.nuxt
COPY --from=builder /frontend/package.json ./

CMD [ "npm" , "run" , "start:prod" ]