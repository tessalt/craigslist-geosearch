var ListingsController = function($scope, $state, $http) {

  $scope.options = $state.params;

  $scope.editOptions = function() {
    $state.transitionTo('options', $scope.options);
  }

  $http.get('/scraper/cl_listings', {
    params: $scope.options
  }).success(function(data){
    $scope.listings = data;
  });

}

module.exports = ListingsController;