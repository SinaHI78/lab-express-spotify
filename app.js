require('dotenv').config();

const express = require('express');
const hbs = require('hbs');

// require spotify-web-api-node package here:
const SpotifyWebApi = require('spotify-web-api-node');

const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

// setting the spotify-api goes here:
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET
});

// Retrieve an access token
spotifyApi
  .clientCredentialsGrant()
  .then((data) => spotifyApi.setAccessToken(data.body['access_token']))
  .catch((error) =>
    console.log('Something went wrong when retrieving an access token', error)
  );

// Our routes go here:
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/artist-search-results/:artistName', (req, res, next) => {
  spotifyApi
    .searchArtists(req.params.artistName)
    .then((data) => {
      res.render('artist-search-results');
      console.log('The received data from the API: ', data.body);
    })
    .catch((err) =>
      console.log('The error while searching artists occurred: ', err)
    );
});

/*app.get('/albums/:artistId', (req, res, next) => {
  // Get albums by a certain artist
  spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE').then(
    function (data) {
      console.log('Artist albums', data.body);
    },
    function (err) {
      console.error(err);
    }
  );
});*/

app.listen(3000, () =>
  console.log('My Spotify project running on port 3000 🎧 🥁 🎸 🔊')
);
