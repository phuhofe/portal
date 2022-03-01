FROM nginx:alpine
RUN mv /etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.bak
COPY nginx.conf /etc/nginx/conf.d/
COPY ./dist/ng-ourmemorial /usr/share/nginx/html
EXPOSE 4200
CMD [ "nginx", "-g", "daemon off;" ]
