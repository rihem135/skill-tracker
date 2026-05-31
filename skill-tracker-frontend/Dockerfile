FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --configuration=production

FROM nginx:1.25-alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Correction : copier depuis le dossier browser (Angular 17+)
COPY --from=builder /app/dist/skill-tracker-frontend/browser /usr/share/nginx/html
EXPOSE 80