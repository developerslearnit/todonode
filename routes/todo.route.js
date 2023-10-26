const express = require('express');
const todoCtrl = require('../controller/todo.controller');

const router = express.Router();

router.get('/api/v1/todos', todoCtrl.getTodos);
router.get('/api/v1/todos/:id', todoCtrl.getTodoByOwnerId);
router.post('/api/v1/todos', todoCtrl.addTodo);
router.delete('/api/v1/todos/:id',todoCtrl.deleteTodo);
router.put('/api/v1/todos/:id',todoCtrl.updateTodo)

// router.delete('/api/v1/todos', todoCtrl.deleteTodo)

module.exports = router;
