var express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path');


var app = express();

app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser());

var port = Number(process.env.PORT || 3000);
var server = app.listen(port,  function() {
  console.dir("server listening on port " + server.address().port);
});

app.get('/', function(req, res){
  res.sendfile('index.html');
});