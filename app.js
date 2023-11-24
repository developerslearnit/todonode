const express = require('express');
const todoRoute = require('./routes/todo.route');
const categoryRoute = require('./routes/category.route');
const userRoute = require('./routes/user.route');


//Create the express app
const app = express();

app.use(express.json());

app.use(todoRoute);
app.use(categoryRoute);
app.use(userRoute);

const port = process.env.PORT || 3000;


//spin up our server to listen in our port
app.listen(port, "0.0.0.0", () =>{
    console.log(`Server is running on port ${port}`)
});
