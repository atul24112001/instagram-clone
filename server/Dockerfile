FROM node:18
WORKDIR /usr/app

COPY package*.json ./
COPY tsconfig.json ./
RUN npm install

COPY . .
CMD ["npm", "start"]

EXPOSE 8000
