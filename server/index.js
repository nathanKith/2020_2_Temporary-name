'use strict';

const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const app = express();

app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use(body.json());
app.use(cookie());



// app.get('/me', (req, res) => {
//     res.json(feedData);
// });
//
// app.get('/feed', (req, res) => {
//     res.json(feedData);
// });
//
// app.get('/me', (req, res) => {
//     res.json(feedData);
// });
//
// app.post('/signup', (req, res) => {
//     res.status(200).json({});
// });
//
// app.post('/login', (req, res) => {
//     res.status(200).json({});
// });

const port = 3000;

app.listen(port,  () => {
    console.log(`Server listening port ${port}`);
});