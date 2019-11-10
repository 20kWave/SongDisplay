/* eslint-disable camelcase */
const express = require('express');
const path = require('path');
const router = require('./router.js');
// const db = require('../db/Model');
const compression = require('compression');
const newrelic = require('newrelic');
var bodyParser = require('body-parser');
const app = express();

// Sidebar is on port 5000; use 5001
const port = 5001;

// CORS Policy
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// Compress files
app.use(compression({filter: shouldCompress}));

function shouldCompress(req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false;
  }

  // fallback to standard filter function
  return compression.filter(req, res);
}

app.use(bodyParser.json());

// Serve the static index file from the React app
app.use('/', express.static(path.join(__dirname, '../public/')));
app.use('/song/:songId', express.static(path.join(__dirname, '../public/')));

app.get('/display/song/:songId', router.router);
app.post('/display/comment/:songId', router.router);
app.delete('/display/comment/:songId', router.router);
app.put('/display/song/:songId', router.router);


app.get('/cass/:songId?', router.router);
// app.get('/postgres/:songId?', router.router);

app.listen(port, () => console.log(`Express App running on port ${port}`));
