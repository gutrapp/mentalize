FROM node:16 AS builder-react
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build
RUN cat /app/dist

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder-react /app/dist /usr/share/nginx/html

RUN rm -rf /etc/nginx/conf.d/*
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]