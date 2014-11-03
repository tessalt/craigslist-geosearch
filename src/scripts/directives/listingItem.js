var listingItem = function($http) {
  return {
    scope: {
      listing: '='
    },
    templateUrl: '../../listing-item.html',
    restrict: 'E'
  }
}

module.exports = listingItem;
