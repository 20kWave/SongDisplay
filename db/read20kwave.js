const filePath = '/Users/Britt-Britt1/hackReactor/SongDisplay/db/20kWave - Sheet1.csv';

const csv = require('csv-parser');
const fs = require('fs');

function readSongCSV(filePath, songs, cb) {

  // var songs = [];
  fs.createReadStream('20kWave - Sheet1.csv')
    .pipe(csv())
    .on('data', (row) => {
      delete row.like_count;
      delete row.play_count;
      delete row.repost_count;
      delete row.comment_count;
      var waves = JSON.parse(row.waveform_data);
      delete waves.xValues;
      var pos = waves.positiveValues;
      for (var i = 0; i < pos.length; i++) {
        // console.log(typeof pos[i]);
        pos[i] = parseFloat(pos[i].toFixed(4));
      }

      var neg = waves.negativeValues;
      for (var i = 0; i < pos.length; i++) {
        neg[i] = parseFloat(neg[i].toFixed(4));
      }

      row.waveform_data = JSON.stringify(waves);
      row.date_posted = Date.parse(row.date_posted);
      songs.push(row);
      // console.log('song id', row.song_id);

    })
    .on('end', () => {
      console.log('CSV file successfully processed');
      cb();
    });

}


function writeWaveFormstoJSON(filePath, songs) {

  var songs = [];
  fs.createReadStream('20kWave - Sheet1.csv')
    .pipe(csv())
    .on('data', (row) => {
      delete row.like_count;
      delete row.play_count;
      delete row.repost_count;
      delete row.comment_count;
      var waves = JSON.parse(row.waveform_data);
      delete waves.xValues;
      var pos = waves.positiveValues;
      for (var i = 0; i < pos.length; i++) {
        // console.log(typeof pos[i]);
        pos[i] = parseFloat(pos[i].toFixed(4));
      }

      var neg = waves.negativeValues;
      for (var i = 0; i < pos.length; i++) {
        neg[i] = parseFloat(neg[i].toFixed(4));
      }

      row.waveform_data = JSON.stringify(waves);
      row.date_posted = Date.parse(row.date_posted);
      songs.push(row);
      // console.log('song id', row.song_id);

    })
    .on('end', () => {
      console.log('CSV file successfully processed');
      for (var i = 0; i < songs.length; i++) {
        // console.log('writing song for id', songs[i].song_id);
        var id = songs[i].song_id;
        let writer = fs.createWriteStream(`waveform-${id}.json`);
        writeWaveforms(writer, songs[i].waveform_data, 'utf-8', () => {
          writer.end();
        });
      }
    });

}

//writing JSON files for S3
// writeWaveFormstoJSON(filePath, []);

function writeWaveforms(writer, waveform, encoding, callback) {
  let i = 1;
  let id = 0;

  function write() {
    let ok = true;
    do {

      var data = `${waveform}`;
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

module.exports.readSongCSV = readSongCSV;