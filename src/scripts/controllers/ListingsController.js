var ListingsController = function($scope, $state) {

  $scope.options = $state.params;

  $scope.editOptions = function() {
    $state.transitionTo('options', $scope.options);
  }

}

module.exports = ListingsController;