var Q = require('q'),
    geolib = require('geolib');

var Filter = function(coordinates) {
  this.coordinates = coordinates;
}

Filter.prototype.geoFilter = function(listings) {
  var limits = this.coordinates.map(function(coordinate){
    coordinate = coordinate.split(',');
    return {
      latitude: coordinate[0],
      longitude: coordinate[1]
    }
  });
  return listings.filter(function(listing){
    return geolib.isPointInside({
      latitude: listing.Latitude,
      longitude: listing.Longitude
    }, limits);
  });
};

module.exports = Filter;
