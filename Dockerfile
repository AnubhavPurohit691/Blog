FROM node:23-alpine

WORKDIR /app

COPY ./package.json ./package.json

COPY  ./pnpm-lock.yaml ./pnpm-lock.yaml


