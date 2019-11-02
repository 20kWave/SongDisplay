const faker = require('faker');
const fs = require('fs');
const wave = require('./read20kwave.js');

const writeArists = fs.createWriteStream('artists.csv');
const writeUsers = fs.createWriteStream('users.csv');
writeArists.write('artist_name\n', 'utf8');
writeUsers.write('name\n', 'utf8');

function writeArtistUsers(writer, encoding, callback, table) {

  let i = 96;

  if (table === 'artists') {
    i = 96;
  } else if (table === 'users') {
    i = 2000;
  }
  let id = 0;

  function write() {
    let ok = true;
    do {
      // console.log('wave: ', wave.songs[id]);
      let data = '';
      if (table === 'artists') {
        data = `${wave.songs[id].artist_name}\n`;
      } else if (table === 'users') {
        data = `${faker.internet.userName()}\n`;
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

writeArtistUsers(writeArists, 'utf-8', () => {
  writeArists.end();
}, 'artists');

writeArtistUsers(writeUsers, 'utf-8', () => {
  writeUsers.end();
}, 'users');

// module.exports.createPGData = createPGData;
