const express = require('express');
const db = require('../db/Model');
const cass = require('../db/queryCass.js');
const pg = require('../db/queryPG.js');

const router = express.Router();

router.get('/song/:songId?', (req, res) => {
  const id = req.params.songId;
  const song_id = 'Song_'.concat(String(id));
  console.log('getting songs..', song_id);
  db.getSong(song_id, res);
  
});

router.post('/comment/:songId?', (req, res) => {
  const { id } = req.params.songId;
  const song_id = 'Song_'.concat(String(id));
  console.log('got post for id: ', id);
  res.end('POST');
});

router.delete('/comment/:songId?', (req, res) => {
  const { id } = req.params.songId;
  const song_id = 'Song_'.concat(String(id));
  console.log('got delete for id: ', id);
  res.end('DELETE');
});

router.put('/song/:songId?', (req, res) => {
  const { id } = req.params.songId;
  const song_id = 'Song_'.concat(String(id));
  console.log('got put for id: ', id);
  res.end('PUT');
});


router.get('/cass/:songId?', (req, res) => {
  // console.log('pg id: ', req.params.songId);
  cass.getCassandra(res, req.params.songId);
  
});

router.get('/postgres/:songId?', (req, res) => {
  // console.log('pg id: ', req.params.songId);
  // console.log('pg', id);
  pg.getPG(res, req.params.songId);
  
});

module.exports.router = router;
