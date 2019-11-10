# SongDisplay

This feature is an audio player 

## Table of Contents

1. [API](#API)
1. [Requirements](#requirements)
1. [Dependencies](#installing)
1. [Development](#development)

## API
### URL
`localhost:5001/songs/:id`
Dynamically renders a song based on id of the entrypoint url.

### GET
`/song/:songId`

Retrieve a song based on id.

#### Parameters

| Query Params| Type |
| ----------- | ----------- |
| `songId` | `number` |

#### Response

| Name | Type |
| ----------- | ----------- |
| `song_id` | int |
| `song_name` | string |
| `upload_time` | int |
| `tag` | string |
| `song_art_url` | string |
| `background_light` | string |
| `background_dark` | string |
| `waveform_data` | JSON |
| `song_duration` | int|
| `comment_id` | int |
| `comment` | string |
| `username` | string |
| `timestamp` | int |
| `artist_name` | string |


### POST
`/comment/:songId`

Add a comment to a song.

#### Body

| Name | Type |
| ----------- | ----------- |
| `songId` | number |
| `comment` | string |
| `userId` | number |
| `timestamp` | dateTime |



### DELETE
`/comment/:songId`

Delete a comment from a song

#### Parameters

| Query Params| Type |
| ----------- | ----------- |
| `songId` | number |
| `commentId` | number |



### PUT
`/song/:songId`

Update a song's name

#### Parameters

| Query Params| Type |
| ----------- | ----------- |
| `songId` | number |
| `songName` | string |


## Requirements

- Node 6.13.1

## Installing Dependencies

From within the root directory:

```sh
npm install
```

## Development

From within the root directory, do each of the following:

- Run webpack to build bundle.js
```sh
npm run build
```
- Start the server at port 5001
```sh
npm start
```
