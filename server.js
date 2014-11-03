var express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    Q = require('q'),
    moment = require('moment'),
    Scraper = require('./server/modules/scraper'),
    Filter = require('./server/modules/filter');

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

app.get('/scraper/cl_listings', function(req, res){

  var parser = new Scraper(req.query);

  var filter = new Filter(req.query.coordinates);

  parser.fetch().then(function(listings){
    var filtered = filter.geoFilter(listings);
    res.send(filtered);
  });

});
