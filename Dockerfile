FROM nginx:1.19.4-alpine
# Copy the compiled html files
COPY dist/ /usr/share/nginx/html
# Copy the config for nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Run the nginx webserver will run on the port defined in `nginx.conf`
CMD nginx -g 'daemon off;'

