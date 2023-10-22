FROM node:16.10.0-alpine3.13 as build-stage

WORKDIR /app

COPY package*.json ./

RUN npm run install 

COPY . .

RUN npm run build

FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /app/dist /app/dist

COPY ../nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]