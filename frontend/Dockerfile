FROM nginx:alpine

WORKDIR /usr/share/nginx/html

# This project is a static HTML/JS/CSS frontend.
# We copy the files directly instead of relying on a build/ folder.
COPY index.html ./index.html
COPY app.js ./app.js
COPY styles.css ./styles.css

EXPOSE 80


