# Swagger server

### Running the server
To run the server, run:

```
npm start
```

To view the Swagger UI interface:

```
open http://localhost:8080/docs
```

The application also needs a mongodb in order to function, please run the following commands before starting

```
docker pull mongo 
sudo docker run -it -v mongodata:/data/db -p 27017:27017 --name mongodb -d mongo
```
