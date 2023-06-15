FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install -g pnpm
RUN npm install -g pm2
RUN pnpm install
RUN pnpm build

COPY . .

CMD [ "pm2", "start", 'dist/main.js' ]
