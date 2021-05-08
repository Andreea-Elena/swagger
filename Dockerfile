FROM node:9-slim
WORKDIR /swagger
COPY package.json ./swagger
RUN npm install
COPY [".", "c:/swagger/"]
CMD ["npm","start"]