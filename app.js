const express = require('express');


//Create the express app
const app =express();

//create a router for our todos
const todos = [
    {
        id: 1,
        title: 'Learn Node',
        completed: false
    },
    {
        id: 2,
        title: 'Learn Express',
        completed: true
    },
    {
        id: 3,
        title: 'Learn MongoDB',
        completed: false
    },
    {
        id: 4,
        title: 'Learn React',
        completed: true
    }
];

app.get(
    '/api/v1/todos',(req,res) => {
        res.status(200).json(todos)
    }
);

app.get(
    '/api/v1/todos/:id',(req,res) => {
        const todId = req.params.id;
        const targetTodo = todos.find((todo) => todo.id === Number(todId) || {})
        res.status(200).json(targetTodo)
    }
);

app.get(
    '/api/v1/todos/status/:status',(req,res) => {
        const todostatus = req.params.status;
        const realStatus = todostatus === 'completed' ? true : false ;
        const targetTodo = todos.filter((todo) => todo.completed === realStatus) || [];
        res.status(200).json(targetTodo)
    }
    );
//Assignment to map the titles
app.get(
    '/api/v1/titles/',(req,res) => {
        const targetTodo = todos.map((todo) => todo.title) || [];
        res.status(200).json(targetTodo)
    }
);


app.get(
    '/api/v1/ids/',(req,res) => {
        const targetTodo = todos.map((todo) => todo.id) || [];
        res.status(200).json(targetTodo)
    }
);

//create a port
const port = 2123;

//spin up our server to listen in our port
app.listen(port, () =>{
    console.log(`Server is running on port ${port}`)
});