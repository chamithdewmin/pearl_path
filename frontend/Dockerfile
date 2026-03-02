FROM nginx:alpine

# Copy the built frontend app (e.g. React/Vite build output)
# Make sure you run `npm run build` (or equivalent) BEFORE building this image
# so that the `build/` folder exists next to this Dockerfile.
COPY build/ /usr/share/nginx/html/

EXPOSE 80

