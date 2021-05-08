FROM node:9-slim
WORKDIR /swagger
COPY package.json ./swagger
RUN npm install
COPY . /swagger 
CMD ["npm","start"]