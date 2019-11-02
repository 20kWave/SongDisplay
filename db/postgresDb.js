
const fs = require('fs');
const generateComments = require('./commentsCreator');

const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'brittney',
  host: 'localhost',
  database: 'wavedisplay',
  password: 'password',
  port: 5432,
});

pool.connect(err => {
  if (err) {
    console.error('connection error', err.stack);
  } else {
    console.log('connected to postgres');
  }
});