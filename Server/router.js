const express = require('express');
// const db = require('../db/Model');
const cass = require('../db/queryCass.js');

const router = express.Router();

router.get('/song/:songId?', (req, res) => {
  //console.log('service request..', req.params.songId);
  cass.getCassandra(res, req.params.songId);
});

router.post('/comment/:songId?', (req, res) => {
  cass.postCassandra(res, req.body, req.params.songId);
});

router.delete('/comment/:songId?', (req, res) => {
  const { id } = req.params.songId;
  console.log('got delete for id: ', id);
  res.end('DELETE');
});

router.put('/song/:songId?', (req, res) => {
  const { id } = req.params.songId;
  res.end('PUT');
});

module.exports = router;
