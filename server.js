const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const stories = require('./app/stories');
const comments = require('./app/comments');

const app = express();
app.use(express.json());
app.use(express.static('public'))
app.use(cors());

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'user',
    password : 'password',
    database : 'blog',
    multipleStatements: true
});

const port = 8000;

app.use('/stories', stories(connection));
app.use('/comments', comments(connection));

connection.connect((err) => {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
    app.listen(port, () => {
        console.log('Server started on  port')
    });
});
