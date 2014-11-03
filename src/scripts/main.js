(function(){

  var $ = require('jquery'),
      L = require('leaflet');

  var angular = require('angular');
  require('angular-ui-router');
  require('leaflet_draw');

  var NavController = require('./controllers/NavController');
  var OptionsController = require('./controllers/OptionsController');
  var ListingsController = require('./controllers/ListingsController');
  var listingItem = require('./directives/listingItem');

  var app = angular.module('listingScraper', ['ui.router']);

  app.controller('NavController', ['$scope', '$state', NavController]);

  app.controller('OptionsController', ['$scope', '$state', OptionsController]);

  app.controller('ListingsController', ['$scope', '$state', '$http', '$sce', ListingsController]);

  app.directive('listingItem', ['$http', listingItem]);

  app.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('options', {
      url: '/options?coordinates&maxprice&minrooms&city',
      templateUrl: 'options.html'
    }).state('listings', {
      url: '/listings?coordinates&maxprice&minrooms&city',
      templateUrl: 'listings.html'
    });

     $urlRouterProvider.when('', '/options');

  });

})();