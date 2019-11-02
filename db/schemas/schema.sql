drop database if exists wavedisplay;

CREATE DATABASE wavedisplay;

\c wavedisplay;

create table Artists (
  artist_id SERIAL PRIMARY KEY,
  artist_name int
);

create table Songs (
  song_id SERIAL,
  song_name varchar(255),
  upload_time BIGINT,
  tag varchar(255),
  song_art_url varchar(255),
  song_data_url varchar(255),
  background_light varchar(255),
  background_dark varchar(255),
  waveform_data JSON,
  song_duration int,
  artist_id int,
  PRIMARY KEY (song_id),
  FOREIGN KEY (artist_id) references Artists(artist_id)
);

create table Users (
  user_id SERIAL,
  name varchar(255),
  PRIMARY KEY (user_id)
);

create table Comments (
  comment_id SERIAL,
  time_stamp int NOT NULL,
  comment varchar(255) NOT NULL,
  song_id int NOT NULL,
  user_id int NOT NULL,
  PRIMARY KEY (comment_id),
  FOREIGN KEY (song_id) references Songs(song_id),
  FOREIGN KEY (user_id) references Users(user_id)
);

