import express, { request, response } from "express";
import routes from './routes/index.mjs'
import cookieParser from "cookie-parser";
import session from "express-session";
import { mockUsers } from "./utils/constants.mjs";

const app = express();

app.use(express.json());
app.use(cookieParser('helloworld'));
app.use(
    session({
    secret: 'pop the dev',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 60000 * 60
    } 
    }));
app.use(routes); 
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get('/', (request, response) => {
    console.log(request.session);
    console.log(request.session.id)
    request.session.visited = true
  response.cookie('hello', 'world', { maxAge: 50000, signed: true });
    response.status(201).send({ messsage: 'Hello!'});
});
 
app.post('/api/auth', (request, response) => {
  const { body: { username, password },
 } = request;

const findUser = mockUsers.find((user) => user.username === username);
if (!findUser || findUser.password !== password) return response.status(401).send({ msg: "BAD CREDENTIALS" });

request.session.user = findUser;
return response.status(200).send(findUser)
});

app.get('/api/auth/status', (request, response) => {
    request.sessionStore.get(request.sessionID, (err, session) => {
      console.log(session) 
    });
    return request.session.user 
     ? response.status(200).send(request.session.user)
     : response.status(401).send({ msg: "NOT AUTHENTICATED" });
});
 
app.post('/api/cart', (request, response) => {
if (!request.session.user) return response.sendStatus(401);
const { body: item } = request;
const { cart } = request.session;
if (cart) {
    cart.push(item);
} else {
    request.session.cart = [item];
}  
return response.status(201).send(item); 

});

app.get('/api/cart', (request, response) => {
    if (!request.session.user) return response.sendStatus(401);
    return response.send(request.session.cart ?? []);
})