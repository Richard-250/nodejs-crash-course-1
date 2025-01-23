import express from "express";
import routes from './routes/index.mjs'
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser('helloworld'));
app.use(routes); 
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get('/', (request, response) => {
  response.cookie('hello', 'world', { maxAge: 50000, signed: true });
    response.status(201).send({ messsage: 'Hello!'});
});
 
 