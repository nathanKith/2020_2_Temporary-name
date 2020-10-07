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

const feedData = {
    profileName: 'Кайя',
    universityWork: 'МГТУ им. Баумана',
    age: 20,
    aboutMe: 'Люблю письки и пиписьки. Дебил прост ооооотбитый ахаахаххах',
    photoNumber: 3,
    linkImages: [
        './../../img/pretty-girl.svg',
        './../../img/pretty-girl.svg',
        './../../img/pretty-girl.svg',
    ]
};

app.get('/feed', (req, res) => {
    res.json(feedData);
});

app.get('/me', (req, res) => {
    res.json(feedData);
});

const port = 3000;

app.listen(port,  () => {
    console.log(`Server listening port ${port}`);
});