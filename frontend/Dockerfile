###########
# Stage 1 #
###########
# Build the SPA (e.g. Vite/React) inside the frontend directory
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install && npm cache clean --force

COPY . .

# Backend API base URL for the frontend build
# Can be overridden in Dokploy with a build arg if needed
ARG VITE_API_URL=https://demo.logozodev.com/api
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

###########
# Stage 2 #
###########
# Serve the built assets with nginx
FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist ./

RUN chown -R nginx:nginx /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

