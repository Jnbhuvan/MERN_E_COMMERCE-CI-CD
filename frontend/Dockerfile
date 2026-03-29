# FROM node:22-alpine

# WORKDIR /frontend

# COPY package.json package-lock.json ./

# RUN npm install

# COPY . .

# EXPOSE 5173

# CMD [ "npm","run","dev" ]

# Stage 1: Build
FROM node:18 as build

WORKDIR /app

COPY . .

RUN npm install
# RUN npm run build

# Stage 2: Serve
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]