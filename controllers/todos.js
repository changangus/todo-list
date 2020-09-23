const Todo = require('../models/Todo');
const { replaceOne } = require('../models/Todo');

// GET all Todos
// Ruote: GET 'api/todos'
// Access: Public
exports.getTodos = async (req, res, next) => {
    try {
        const todos = await Todo.find();
        return res.status(200).json({
            success: true,
            count: todos.length,
            data: todos,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: `There was an error: ${error}`
        })
    }
}
// Post new todo
// Route: POST 'api/todos'
// Access: Public
exports.postTodo = async (req, res, next) => {
    try {
        const { name, completed } = req.body;
        const todo = await Todo.create(req.body);

        return res.status(200).json({
            success: 200,
            data: todo
        })
    } catch (error) {
        if (error.name === 'ValidationError'){
            const messages = Object.values(error.errors).map(val => val.message);

            res.status(400).json({
                success: false,
                error: messages
            })
        } else {
            res.status(500).json({
                success: false,
                error: `There was an error ${error}`
            })
        }
    }
}

// Show a specific todo
// Route: GET 'api/todos/:id
exports.getTodo = async (req, res, next) => {
    try {
        const foundTodo = await Todo.findById(req.params.id);

        if(!foundTodo){
            return res.status(404).json({
                success: false,
                error: 'No todo item found'
            })
        } else {
            return res.status(200).json({
                success: true,
                data: foundTodo
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            error: `There was an error: ${error}`
        })
    }
}

// Uptdate/Edit a todo
// Route: PUT 'api/todos/:id
exports.updateTodo = async (req, res, next) => {
    try {
        const foundTodo = await Todo.findOneAndUpdate({_id: req.params.id}, req.body, {new: true});
        if(!foundTodo){
            return res.status(404).json({
                success: false,
                error: 'No todo item found'
            })
        } else {
            return res.status(200).json({
                success: true,
                data: foundTodo
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: `There was an error: ${error}`
        })
    }
}

// Delete a todo
// Route: DESTROY 'api/todos/:id
exports.deleteTodo = async (req, res, next) => {
    try {
        const foundTodo = await Todo.findOneAndDelete({_id: req.params.id})
        if(!foundTodo){
            return res.status(404).json({
                success: false,
                error: 'No todo item found'
            })
        } else {
            return res.status(200).json({
                success: true,
                data: []
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: `There was an error: ${error}`
        })
    }
}

module.exports = exports;