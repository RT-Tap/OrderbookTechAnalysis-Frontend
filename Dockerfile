FROM node:18
WORKDIR /app
COPY . .
RUN npm i
RUN npm run build
FROM httpd:2.4
COPY --from=0 /app/build /usr/local/apache2/htdocs/
