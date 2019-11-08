const cassandra = require('cassandra-driver');
const client = new cassandra.Client({ contactPoints: ['localhost'], localDataCenter: 'datacenter1', keyspace: 'wavedisplay' });


function getCassandra(res, id) {
  const query = `SELECT * FROM songs_comments WHERE song_id=${id}`;
  client.execute(query)
    .then(result => {
      // console.log('got results cass');
      res.send(result.rows);
    })
    .catch(err => {
      // console.log('error cass');
      res.status(500).end();
    });
}

module.exports.getCassandra = getCassandra;