const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(`${__dirname}/public`));
app.use(express.static(`${__dirname}/views`));

dotenv.config({path: './config/config.env'});

connectDB();

const todoRoutes = require('./routes/todos');

app.get('/', function(req, res){
    res.sendFile('index.html')
})

app.use('/api/todos', todoRoutes);

const PORT = process.env.PORT || 3000;

app.listen(3000, function(){
    console.log(`App is running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold)
})