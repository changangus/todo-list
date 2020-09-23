$(document).ready(async function(){
    try {
        let res = await $.getJSON("api/todos");
        addTodos(res.data);
        $("#todoInput").keypress(function(event){
            if(event.which === 13){
                createToDo();
            }
        });
        $('.list').on('click', 'li', function(){
            updateTodo($(this))
        })
        $('.list').on('click', 'span', function(e){
            e.stopPropagation();
            removeTodo($(this).parent());
        });
    } catch (error) {
        console.log(error);
    } 
});

function addTodos(todos){
    todos.forEach(function(todo){
        addTodo(todo);
    });
};
// Add todos from database to the DOM
function addTodo(todo) {
        let newTodo = $(`<li class='task'>${todo.name}<span>X</span></li>`);
        newTodo.data('id', todo._id);
        newTodo.data('completed', todo.completed);
        if(todo.completed){
            newTodo.addClass('done');
        }
        $(".list").append(newTodo);
};
// Send request to create new todo
async function createToDo(){
    try {
        userInput = $('#todoInput').val();
        let newTodo = await $.post('/api/todos', {name: userInput});
        $('#todoInput').val('')
        addTodo(newTodo.data);
    } catch (error) {
        console.log(error);
    }

}
// 
async function removeTodo(todo){
    try {
        let clickedId = todo.data('id');
        await $.ajax({
                method: 'DELETE',
                url: `/api/todos/${clickedId}`
              });
        todo.remove();
    } catch (error) {
        console.log(error);
    } 
}
// 
async function updateTodo(todo){
    try {
        let clickedId = todo.data('id');
        let isDone = !todo.data('completed');
        let updateData = {completed: isDone};
        await $.ajax({
            method: 'PUT',
            url: `api/todos/${clickedId}`,
            data: updateData
        });
        todo.toggleClass('done');
        todo.data('completed', isDone);
    } catch (error) {
        console.log(error)
    }
}