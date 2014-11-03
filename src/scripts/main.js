(function(){

  var $ = require('jquery'),
      L = require('leaflet');

  var angular = require('angular');
  require('angular-ui-router');
  require('leaflet_draw');

  var OptionsController = require('./controllers/OptionsController');
  var ListingsController = require('./controllers/ListingsController');
  var listingItem = require('./directives/listingItem');

  var app = angular.module('listingScraper', ['ui.router']);

  app.controller('OptionsController', ['$scope', '$state', OptionsController]);

  app.controller('ListingsController', ['$scope', '$state', '$http', ListingsController]);

  app.directive('listingItem', ['$http', listingItem]);

  app.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('options', {
      url: '/options?coordinates&maxprice&minrooms&city',
      templateUrl: 'options.html'
    }).state('listings', {
      url: '/listings?coordinates&maxprice&minrooms&city',
      templateUrl: 'listings.html'
    }).state('listings.preview', {
      url: '/:preview',
      templateUrl: 'listing-preview.html',
      controller: function($scope, $stateParams, $http, $sce) {
        var url = '/previews/' + $stateParams.preview;
        $http.get(url).then(function(data){
          var html = $(data.data).find('.userbody').html();
          $scope.preview = $sce.trustAsHtml(html);
        })
      }
    });

  });

})();