const cassandra = require('cassandra-driver');
const client = new cassandra.Client({ contactPoints: ['localhost'], localDataCenter: 'datacenter1', keyspace: 'wavedisplay' });


function getCassandra(res, id) {
  const query = `SELECT * FROM songs_comments WHERE song_id=${id}`;
  console.log('executing...', query);
  client.execute(query)
    .then(result => {

      var cleanRes = {
        'song_id': null,
        'song_name': null,
        'artist_name': null,
        'upload_time': null,
        'tag': null,
        'song_art_url': null,
        'song_data_url': null,
        'background_light': null,
        'background_dark': null,
        'waveform_data': null,
        'song_duration': null
      };

      var comments = [];

      var dbData = result.rows;
      for (var i = 0; i < dbData.length; i++) {
        if (dbData[i].song_name !== null) {
          //set song info
          cleanRes.song_id = dbData[i].song_id;
          cleanRes.song_name = dbData[i].song_name;
          cleanRes.artist_name = dbData[i].artist_name;
          cleanRes.upload_time = dbData[i].upload_time;
          cleanRes.tag = dbData[i].tag;
          cleanRes.song_art_url = dbData[i].song_art_url;
          cleanRes.song_data_url = dbData[i].song_data_url;
          cleanRes.background_light = dbData[i].background_light;
          cleanRes.background_dark = dbData[i].background_dark;
          cleanRes.waveform_data = dbData[i].waveform_data;
          cleanRes.song_duration = dbData[i].song_duration;
        } else {
          var commentData = {};
          commentData.Id = dbData[i].comment_id;
          commentData.user_name = dbData[i].username;
          commentData.time_stamp = dbData[i].timestamp;
          commentData.comment = dbData[i].comment;

          comments.push(commentData);
        }

      }
      return [cleanRes, comments];
    })
    .then(result =>{
      res.send(result);
    })
    .catch(err => {
      // console.log('error cass');
      res.status(500).end();
    });
}

function postCassandra(res, queryInfo, id) {
  
  const query = `INSERT INTO songs_comments (song_id, timestamp, comment, comment_id, username) VALUES (${id}, ${queryInfo.time_stamp}, '${queryInfo.comment}', ${parseInt(queryInfo.id) + 1}, '${queryInfo.username}')`;
  client.execute(query)
    .then(result => {
      res.status(200).end();
    })
    .catch(err => {
      res.status(500).end();
    });
}

module.exports.getCassandra = getCassandra;
module.exports.postCassandra = postCassandra;