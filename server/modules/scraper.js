var Q = require('q'),
    moment = require('moment'),
    rp = require('request-promise'),
    request = require('request'),
    querystring = require('querystring');


var Scraper = function(options) {
  this.options = options;
  this.json = {
    listings: []
  };
  this.rootUrl = 'http://' + this.options.city + '.craigslist.ca';
}

Scraper.prototype.fetch = function() {
  var deferred = Q.defer();
  var self = this;
  var params = querystring.stringify({
    maxAsk: this.options.maxprice,
    bedrooms: this.options.minrooms,
    postedToday: 1
  });
  var uri = 'http://' + this.options.city + '.craigslist.ca/jsonsearch/apa?' + params;
  this.extractListings(uri).then(function(){
    deferred.resolve(self.json);
  }, function(reason){
    deferred.reject(reason);
  });
  return deferred.promise;
}

Scraper.prototype.extractListings = function(uri) {
  console.log('fetching');
  var self = this;
  var options = {
    uri: uri,
    method: 'GET'
  }
  return Q.nfcall(request, options).then(function(res){
    var entries = JSON.parse(res[0].body);
    return Q.all(entries[0].map(function(entry){
      if (!entry.url){
        self.json.listings.push(entry);
        return null;
      } else {
        return self.extractListings(self.rootUrl + entry.url);
      }
    }));
  });
};

module.exports = Scraper;