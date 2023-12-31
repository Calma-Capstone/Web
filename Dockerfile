FROM node:20-alpine as react-build
WORKDIR /calma-app

COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build
FROM nginx:1.25
COPY nginx.conf /etc/nginx/conf.d/configfile.template
COPY --from=react-build /calma-app/build /usr/share/nginx/html

ENV PORT 8080
ENV HOST 0.0.0.0
EXPOSE 8080
CMD sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"