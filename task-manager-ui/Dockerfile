FROM node:18-slim

WORKDIR /app

COPY package*.json ./

RUN npm install


COPY . .

RUN npm run build

RUN npm install -g serve
CMD ["serve", "-s", "build"]

EXPOSE 3000
