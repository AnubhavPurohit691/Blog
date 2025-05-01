FROM node:23-alpine

ARG DATABASE_URL

WORKDIR /app



COPY ./package.json ./package.json

COPY  ./pnpm-lock.yaml ./pnpm-lock.yaml

RUN npm install -g pnpm 

RUN pnpm install 



COPY . .

RUN pnpx prisma generate

RUN DATABASE_URL=${DATABASE_URL} pnpm run build

EXPOSE 3000

CMD [ "pnpm" , "dev" ]

