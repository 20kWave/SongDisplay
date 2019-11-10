const express = require('express');
const path = require('path');
const displayRouter = require('./displayRouter.js');
const newrelic = require('newrelic');
const app = express();
const port = 4000;

app.use('/song/:id', express.static(path.join(__dirname, './public')));

app.use('/display', displayRouter.displayRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));