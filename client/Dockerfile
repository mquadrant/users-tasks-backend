# stage1 - build react app first 
FROM node:12.18.2-alpine as build
WORKDIR /app
COPY ./package.json /app
RUN yarn install
RUN npm rebuild node-sass
COPY . /app
RUN yarn run build

# stage 2 - build the final image and copy the react build files
FROM nginx:latest as production-stage
RUN mkdir /app
COPY --from=build /app/build /app
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


