-- CASSANDRA
--get all song info and comments
SELECT * FROM songs_comments WHERE song_id=2;

-- post a comment
INSERT INTO songs_comments (song_id, timestamp, comment, comment_id, username) VALUES (3908941, 100, 'lit', 7, 'bobby');

-- delete a comment *** edit query to be real values of comment and song
DELETE FROM songs_comments WHERE song_id = 5579499 AND comment_id = 8;

--update a song_name
Update songs_comments 
SET song_name = "yay my song changed" 
WHERE song_id=7500000;

--update a comment
Update songs_comments 
SET comment = "bleh", time_stamp="15" 
WHERE song_id=2 and comment_id=5;

--tested queries cassandra
select song_name from songs_comments where song_id =7500000;
Update songs_comments  SET song_name = 'yay my song changed'  WHERE song_id=7500000 and comment_id = -1;
DELETE FROM songs_comments WHERE song_id = 5579499 AND comment_id = 8;
select comment, comment_id from songs_comments where song_id = 3908941;
SELECT * FROM songs_comments WHERE song_id=3908941;
INSERT INTO songs_comments (song_id, timestamp, comment, comment_id, username) VALUES (3908941, 100, 'lit', 7, 'bobby');
SELECT * FROM songs_comments WHERE song_id=8361518;
INSERT INTO songs_comments (song_id, timestamp, comment, comment_id, username) VALUES (6344941, 20, 'so boring lame', 7, 'bobby');
