const express = require('express');
const router = express.Router();
const {getTodos, postTodo, getTodo, updateTodo, deleteTodo} = require('../controllers/todos');

router
    .route('/')
    .get(getTodos)
    .post(postTodo);

router  
    .route('/:id')
    .get(getTodo)
    .put(updateTodo)
    .delete(deleteTodo);

module.exports = router;
