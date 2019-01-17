#!/bin/sh
set -e 

sed -i -e "s@baseURL:\"\"@baseURL:\"${AUTH_ENDPOINT}\"@" /usr/share/nginx/html/static/js/*.js

exec "$@"