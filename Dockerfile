FROM node:20

WORKDIR /app

COPY . .

RUN npm install -g pnpm
RUN npm install -g pm2
RUN pnpm install
RUN pnpm build

CMD [ "pm2", "start", 'dist/main.js' ]
