DROP KEYSPACE IF EXISTS waveTest ;

create keyspace if not exists waveTest with replication = {'class':'SimpleStrategy', 'replication_factor': 3};

use waveTest;

Create table Songs_Comments
(
  song_id int,
  song_name text,
  upload_time bigint,
  tag text,
  song_art_url text,
  song_data_url text,
  background_light text,
  background_dark text,
  waveform_data text,
  song_duration int,
  comment_id UUID,
  comment text,
  username text,
  timestamp int,
  artist_name text,
  Primary key((song_id), comment_id)
);