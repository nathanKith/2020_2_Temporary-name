'use strict';

const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const https = require('https');

const privateKey = fs.readFileSync('/home/ubuntu/key.pem');
const certificate = fs.readFileSync('/home/ubuntu/cert.pem');

const credentials = {key: privateKey, cert: certificate};

const app = express();

app.use(morgan('dev'));
// app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use(express.static(path.resolve(__dirname, '..', 'dist')));
//app.use('*', express.static(path.resolve(__dirname, '..', 'dist')));
app.use(body.json());
app.use(cookie());

app.all('*', function(req, res, next) {
    res.sendFile(path.resolve(__dirname, '..', 'dist/index.html'));
});

const httpsServer = https.createServer(credentials, app)

const port = 3000;
httpsServer.listen(port);
