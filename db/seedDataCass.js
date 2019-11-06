const faker = require('faker');
const fs = require('fs');
const readSongCSV = require('./read20kwave.js');
const filePath = '/Users/Britt-Britt1/hackReactor/SongDisplay/db/20kWave - Sheet1.csv';

function writeComments(writer, encoding, callback) {
  //300M
  // let i = 160000000;
  let i = 100;
  let id = 0;

  function write() {
    let ok = true;
    do {
      let data = '';

      if (i > 4) {
        if (id === 96) {
          id = 0;
        }
        var s = songs[id];
        data = `${id + 1}|${s.song_name}|${s.date_posted}|${s.tag}|${s.song_art_url}|${s.song_data_url}|${s.background_light}|${s.background_dark}|${`https://20kwave.s3-us-west-1.amazonaws.com/waveform-${id + 1}.json`}|${s.song_duration}| | | | | \n`;
      } else {
        var song_id = Math.trunc(getRndBias(1, 10000000, 8000000, .90));
        var actualId = song_id % 96;
        var song_duration = songs[actualId].song_duration;
        var timestamp = Math.round(Math.random() * (song_duration - 0) + 0);
        data = `${song_id}||||||||||comment_id|${faker.lorem.sentences(Math.trunc(getRndBias(1, 5, 1, 1)))}|${faker.internet.userName()}|${timestamp}|${faker.name.firstName()} \n`;

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


function getRndBias(min, max, bias, influence) {
  var rnd = Math.random() * (max - min) + min; // random in range
  var mix = Math.random() * influence; // random mixer
  return rnd * (1 - mix) + bias * mix; // mix full range and bias
}

var headers = 'song_id | song_name |upload_time |tag |song_art_url|song_data_url |background_light |background_dark |waveform_data |song_duration |comment_id |comment |username |timestamp |artist_name \n';
const seedCass = fs.createWriteStream('seedCass.csv');
seedCass.write(headers);
var songs = [];
readSongCSV.readSongCSV(filePath, songs, () => { 
  writeComments(seedCass, 'utf-8', () => {
    seedCass.end();
  });
});
