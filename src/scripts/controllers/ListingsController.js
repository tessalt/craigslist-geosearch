var $ = require('jquery');

var ListingsController = function($scope, $state, $http, $sce) {

  $scope.options = $state.params;

  $scope.editOptions = function() {
    $state.transitionTo('options', $scope.options);
  }

  $scope.showPreview = function(listing) {
    var url = '/previews/' + listing.PostingID;
    $http.get(url).then(function(data){
      var html = $(data.data).find('.userbody');
      html.find('.mapbox').remove();
      html.find('.slidernav').remove();
      $scope.preview = $sce.trustAsHtml(html.html());
    })
  }

  $http.get('/scraper/cl_listings', {
    params: $scope.options
  }).success(function(data){
    $scope.listings = data;
  });

}

module.exports = ListingsController;