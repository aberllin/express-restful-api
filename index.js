const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const {v4: uuid} = require('uuid');

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/pages'));

let todos = [{id: uuid(), content: 'I am your first todo'}];

// SHOW ALL TODOS
app.get('/', (req, res) => {
    res.render('index.ejs', {todos})
})

// NEW FORM
app.get('/new', (req, res) => {
    res.render('new.ejs')
})

// SHOW ONE TODO 
app.get('/:id', (req, res) => {

    const {id} = req.params;
    const todoToShow = todos.find(todo => todo.id === id);
    res.render('details.ejs', {todoToShow})
})
// EDIT FORM 
app.get('/:id/edit', (req, res) => {

    const {id} = req.params;
    const todoToEdit = todos.find(todo => todo.id === id);
    res.render('edit.ejs', {todoToEdit})
})

// ADD TODO
app.post('/', (req, res) => {
    const {content} = req.body;
    todos.push({content, id: uuid()});
    res.redirect('/')
})

// UPDATE TODO
app.patch('/:id', (req, res) => {
    
    const {id} = req.params;
    const {content} = req.body;
    const todoToUpdate = todos.find(todo => todo.id === id);

    todoToUpdate.content = content
    res.redirect(`/${id}`)
})


// DELETE TODO
app.delete('/:id', (req, res) => {
    const {id} = req.params;
    const filteredTodos = todos.filter(todo =>  todo.id !== id);
    todos = filteredTodos;
    res.redirect('/')
})




app.listen(3000, () => {console.log('LISTENING ON 3000!')})