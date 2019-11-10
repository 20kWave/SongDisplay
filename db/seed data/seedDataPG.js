const faker = require('faker');
const fs = require('fs');
const readSongCSV = require('./read20kwave.js');
const filePath = '/Users/Britt-Britt1/hackReactor/SongDisplay/db/20kWave - Sheet1.csv';

function writeArtistUsersSong(writer, encoding, callback, table) {

  let i = 96;

  if (table === 'artists') {
    i = 10000;
  } else if (table === 'users') {
    i = 4000;
  } else if (table === 'songs') {
    i = 10000000;
  }

  let id = 0;

  function write() {
    let ok = true;
    do {
      let data = '';
      if (id === 96 && table === 'songs') {
        id = 0;
      }

      if (table === 'artists') {
        var s = songs[id];
        data = `${faker.name.firstName()}\n`;
      } else if (table === 'users') {
        data = `${faker.internet.userName()}\n`;
      } else if (table === 'songs') {
        var s = songs[id];
        data = `${s.song_name}|${s.date_posted}|${s.tag}|${s.song_art_url}|${s.song_data_url}|${s.background_light}|${s.background_dark}|${`https://20kwave.s3-us-west-1.amazonaws.com/waveform-${id + 1}.json`}|${s.song_duration}|${Math.round(Math.random() * (10000 - 1) + 1)}\n`;
      }

      i -= 1;
      id += 1;
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }
  }
  write();
}


function writeComments(writer, encoding, callback) {
  let i = 70000000;
  let id = 0;

  function write() {
    let ok = true;
    do {

      // var numOfComments = Math.floor(Math.random() * (30 - 1) + 1);
      var song_id = Math.trunc(getRndBias(1, 10000000, 8000000, .95));
      var actualId = song_id % 96;
      var song_duration = songs[actualId].song_duration;
      var timestamp = Math.round(Math.random() * (song_duration - 0) + 0);
      data = `${timestamp}|${faker.lorem.sentences(Math.trunc(getRndBias(1, 5, 1, 1)))}|${song_id}|${Math.floor(Math.random() * (4000 - 1) + 1)}\n`;

      i -= 1;
      id += 1;
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }
  }
  write();
}

function getRndBias(min, max, bias, influence) {
  var rnd = Math.random() * (max - min) + min; // random in range
  var mix = Math.random() * influence; // random mixer
  return rnd * (1 - mix) + bias * mix; // mix full range and bias
}

// const writeArists = fs.createWriteStream('artists.csv');
// writeArists.write('artist_name\n', 'utf8');
// var songs = [];
// readSongCSV.readSongCSV(filePath, songs, () => { 
//   writeArtistUsersSong(writeArists, 'utf-8', () => {
//     writeArists.end();
//   }, 'artists');
// });

// const writeUsers = fs.createWriteStream('users.csv');
// writeUsers.write('name\n', 'utf8');
// writeArtistUsersSong(writeUsers, 'utf-8', () => {
//   writeUsers.end();
// }, 'users');

// const writeSongs = fs.createWriteStream('songs.csv');
// writeSongs.write('song_name|upload_time|tag|song_art_url|song_data_url|background_light|background_dark|waveform_data|song_duration|artist_id\n');
// var songs = [];
// readSongCSV.readSongCSV(filePath, songs, () => { 
//   writeArtistUsersSong(writeSongs, 'utf-8', () => {
//     writeSongs.end();
//   }, 'songs');
// });

// const writeComment = fs.createWriteStream('comments.csv');
// writeComment.write('time_stamp|comment|song_id|user_id \n');
// var songs = [];
// readSongCSV.readSongCSV(filePath, songs, () => { 
//   writeComments(writeComment, 'utf-8', () => {
//     writeComment.end();
//   });
// });

// module.exports.writeArtistUsersSong = writeArtistUsersSong;
