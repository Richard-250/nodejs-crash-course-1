import express, { request, response } from "express";
// import cors from "cors";

const app = express();

// app.use(cors());
app.use(express.json());

// middleware
const loggingMiddleware = (request, response, next) => {
    console.log(`${request.method} - ${request.url}`);
    next();
};


const resolveIndexByUserId = (request, response, next) => {
    const { 
        body,
         params: { id }
         } = request;
    const parsedId = parseInt(id);
    if(isNaN(parsedId)) return response.sendStatus(400);
    const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
    if (findUserIndex === -1) return response.sendStatus(404);
    request.findUserIndex = findUserIndex;
    next();
};


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



const mockUsers = [
    { id:1, username: "mugabo", displayName: "Mugabo"},
    { id:2, username:"kagabo", displayName: "kagabo"},
    { id:3, username:"keline", displayName: "Keline"},
    { id:4, username:"leline", displayName: "leline"},
    { id:5, username:"geline", displayName: "geline"},
    { id:6, username:"meline", displayName: "meline"},
    { id:7, username:"celine", displayName: "celine"}
];

app.get('/', (request, response) => {
    response.status(201).send({ messsage: 'Hello!'});
});

app.get('/api/users', (request, response) => {
    console.log(request.query);
    const { query: { filter, value } } = request;
    if(!filter && ! value) return response.send(mockUsers); 
   
    if(filter && value) return response.send(
        mockUsers.filter((user) => user[filter].includes(value))
    );
     return response.send(mockUsers)

});


app.post('/api/users', (request, response) => {
     const { body } = request;
     const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...body };
     mockUsers.push(newUser);
     return response.status(201).send(newUser);
});


// app.get('/api/products', (request, response) => {
//     response.send([
//         { id:123, name: "chicken wings", price: 12.99},
//     ]);
//     response.end()
// });


app.get('/api/users/:id', resolveIndexByUserId, (request, response) => {
    const { findUserIndex } = request;
    const findUser = mockUsers[findUserIndex]
    if(!findUser) return response.sendStatus(404);
    return response.send(findUser)
});

app.put('/api/users/:id', resolveIndexByUserId, (request, response) => {
const { body, findUserIndex } = request;
mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body };
return response.sendStatus(200);
});

app.patch('/api/users/:id', resolveIndexByUserId, (request, response) => {
    const { body, findUserIndex } = request;
mockUsers[findUserIndex] = { ... mockUsers[findUserIndex], ...body };
return response.sendStatus(200);
});

app.delete('/api/users/:id', resolveIndexByUserId, (request, response) => {
    const { findUserIndex } = request;
    mockUsers.splice(findUserIndex, 1);
    return response.sendStatus(200);
});

