import express from "express";
import routes from './routes/index.mjs'

const app = express();

app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get('/', (request, response) => {
    response.status(201).send({ messsage: 'Hello!'});
});


