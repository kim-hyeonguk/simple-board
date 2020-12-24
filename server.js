const express = require('express');
const app = express();
const api = require('./routes/index');
const usersapi = require('./routes/users');
const mongoose = require('mongoose');


app.use('/api', api);
app.use('/users', usersapi);

mongoose.connect('mongodb+srv://hyeonguk:@guddnr1245@hyeonguk.tchi0.mongodb.net/hyeonguk?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB connected...'))
.catch(error => console.log(error));


app.listen(3001, () => console.log('Node.js Server is running on port 3001...'));

