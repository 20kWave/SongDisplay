const faker = require('faker');
const fs = require('fs');
const wave = require('./read20kwave.js');

const writeArists = fs.createWriteStream('artists.csv');
const writeUsers = fs.createWriteStream('users.csv');
const writeSongs = fs.createWriteStream('songs.csv');
writeArists.write('artist_name\n', 'utf8');
writeUsers.write('name\n', 'utf8');
writeSongs.write('song_name||upload_time||tag||song_art_url||background_light||background_dark||waveform_data||song_duration||id\n');

function writeArtistUsers(writer, encoding, callback, table) {

  let i = 96;

  if (table === 'artists') {
    i = 96;
  } else if (table === 'users') {
    i = 2000;
  } else if (table === 'songs') {
    i = 960000;
  }

  let id = 0;

  function write() {
    let ok = true;
    do {
      // console.log('wave: ', wave.songs[id]);
      let data = '';
      if (id === 96) {
        id = 0;
      }

      if (table === 'artists') {
        data = `${wave.songs[id].artist_name}\n`;
      } else if (table === 'users') {
        data = `${faker.internet.userName()}\n`;
      } else if (table === 'songs') {
        var s = wave.songs[id];
        data = `${s.song_name}||${s.upload_time}|| ${s.tag} ||${s.song_art_url}||${s.background_light} || ${s.background_dark} ||${s.waveform_data} ||${s.song_duration} ||${id}\n`;
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

// writeArtistUsers(writeArists, 'utf-8', () => {
//   writeArists.end();
// }, 'artists');

// writeArtistUsers(writeUsers, 'utf-8', () => {
//   writeUsers.end();
// }, 'users');

writeArtistUsers(writeSongs, 'utf-8', () => {
  writeSongs.end();
}, 'songs');

// module.exports.createPGData = createPGData;
