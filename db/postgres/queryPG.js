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
    console.log('connected to wavedisplay PG');
  }
});

function getPG(res, id) {
  client
    .query(`select 
              s.song_id, 
              s.song_name, 
              s.upload_time, 
              s.tag, 
              s.song_art_url,
              s.song_data_url,
              s.song_duration,
              a.artist_name,
              u.name,
              c.time_stamp,
              c.comment,
              c.comment_id
              from Songs s
              left join Artists a
              on s.artist_id = a.artist_id
              left join Comments c
              on s.song_id = c.song_id
              left join Users u
              on u.user_id = c.user_id
              where s.song_id = ${id}`)
    .then(result => {
      // console.log('done finding results');
      res.send(result.rows);
    })
    .catch(e => {
      // console.error(e.stack);
      res.status(500).end();
      // client.end();
    });
}

module.exports.getPG = getPG;
