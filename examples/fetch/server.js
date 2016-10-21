var express = require('express');
var path = require('path');
var port = process.env.PORT || 3030;
var app = express();
app.use('/app', express.static(path.resolve(__dirname, 'app')));
// app.use('/data', express.static(path.resolve(__dirname, 'data')));
// app.use('/src', express.static(path.resolve(__dirname, '../src')));
var renderIndex = function (req, res) {
  res.sendFile(path.resolve(__dirname, 'index.html'));
};

// Routes:
app.get('/', renderIndex);
app.get('/studio', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'studio.html'));
});
app.get('/studio_multi_file', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'studio_multi_file.html'));
})

// Start server:
var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('This express app is listening on http://localhost:' + port);
});