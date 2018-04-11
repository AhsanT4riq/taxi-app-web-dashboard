const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

// Priority serve any static files.
app.use('/', express.static(path.resolve(__dirname, '../react/build')));

// Answer API requests.
app.get('/api', function (req, res) {
  res.set('Content-Type', 'application/json');
  res.send('{"message":"Hello from the custom server!"}');
});

// All remaining requests return the React app, so it can handle routing.
app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, '../react/build', 'index.html'));
});

app.listen(PORT, function () {
  // console.log(`Listening on port ${PORT}`);
  // console.log(__dirname);
});
