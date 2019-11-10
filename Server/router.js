const express = require('express');
// const db = require('../db/Model');
const cass = require('../db/queryCass.js');
// const pg = require('../db/queryPG.js');

const router = express.Router();

router.get('/display/song/:songId?', (req, res) => {
  // console.log('service request..');
  cass.getCassandra(res, req.params.songId);
});

router.post('/display/comment/:songId?', (req, res) => {
  cass.postCassandra(res, req.body, req.params.songId);
});

router.delete('/display/comment/:songId?', (req, res) => {
  const { id } = req.params.songId;
  console.log('got delete for id: ', id);
  res.end('DELETE');
});

router.put('/display/song/:songId?', (req, res) => {
  const { id } = req.params.songId;
  res.end('PUT');
});

module.exports.router = router;
