FROM node:18.15.0-alpine as build-stage
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN ["npm", "run", "build"]


FROM nginx:alpine
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY --from=build-stage /app/package.json /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80