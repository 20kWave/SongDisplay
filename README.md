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
`/query/song/:song_id`

| Query Params| Type |
| ----------- | ----------- |
| songId | number |

Retrieve a song based on id.

### POST
`/query/comment/:songId`

| Query Params | Type |
| ----------- | ----------- |
| songId | number |
| comment | string |
| userId | number |
| time | dateTime |

Add a comment to a song.

### DELETE
`/query/comment/:songId`

| Query Params| Type |
| ----------- | ----------- |
| songId | number |
| commentId | number |

Delete a comment from a song

### PUT
`/query/songname/:songId`

| Query Params| Type |
| ----------- | ----------- |
| songId | number |

Update a song's name.

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
