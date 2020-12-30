# stage1 - build react app first 
FROM node:12.18.2-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ./package.json /app
COPY . /app
RUN npm run build

# stage 2 - build the final image and copy the react build files
FROM nginx:latest as production-stage
RUN mkdir /app
COPY --from=build /app/build /app
COPY nginx.conf /etc/nginx/nginx.conf
