const express = require('express');
const displayRouter = express.Router();

displayRouter.get('/song/:songId', (req, res) => {
  // console.log('proxy redirecting....');
  res.redirect(301, `http://localhost:5001/display/song/${req.params.songId}`);
});

displayRouter.post('/comment/:songId?', (req, res) => {
  res.redirect(301, `http://localhost:5001/song/${req.params.songId}`);
});


module.exports.displayRouter = displayRouter;
