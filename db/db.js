const { Client } = require('pg');

const client = new Client({
  user: 'brittney',
  database: 'wavedisplay',
  password: 'password'
});

client.connect(err => {
  if (err) {
    console.error('connection error', err.stack);
  } else {
    console.log('connected to wavedisplay');
  }
});

client
  .query('COPY artists (artist_name) from \'/Users/Britt-Britt1/hackReactor/SongDisplay/db/artists.csv\' delimiter \'|\' CSV HEADER')
  .then(result => console.log('arists # rows', result.rowCount))
  .then(() => {
    return client.query('COPY users (name) from \'/Users/Britt-Britt1/hackReactor/SongDisplay/db/users.csv\' delimiter \'|\' CSV HEADER');
  })
  .then(result => console.log('users # rows: ', result.rowCount))
  .then(() => {
    console.log('inserting songs...');
    var queryText = 'COPY songs (song_name, upload_time, tag, song_art_url, song_data_url, background_light, background_dark, waveform_data, song_duration, artist_id) from \'/Users/Britt-Britt1/hackReactor/SongDisplay/db/songs.csv\' delimiter \'|\' CSV HEADER';
    return client.query(queryText);
  })
  .then(result => console.log('songs # rows: ', result.rowCount))
  .then(() => {
    console.log('inserting comments...');
    return client.query('COPY comments (time_stamp, comment, song_id, user_id) from \'/Users/Britt-Britt1/hackReactor/SongDisplay/db/comments.csv\' delimiter \'|\' CSV HEADER');
  })
  .then(result => console.log('comments # rows: ', result.rowCount))
  .catch(e => {
    console.error(e.stack); 
    client.end();
  })
  .then(() => client.end());

