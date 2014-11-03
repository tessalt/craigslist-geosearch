var NavController = function($scope, $state) {

  $scope.goToOptions = function() {
    $state.transitionTo('options', $state.params);
  }

  $scope.goToListings = function() {
    $state.transitionTo('listings', $state.params);
  }

}

module.exports = NavController;