(function(){

  var $ = require('jquery'),
      L = require('leaflet');

  var angular = require('angular');
  require('angular-ui-router');
  require('leaflet_draw');

  var OptionsController = require('./controllers/OptionsController');
  var ListingsController = require('./controllers/ListingsController');

  var app = angular.module('listingScraper', ['ui.router']);

  app.controller('OptionsController', ['$scope', '$state', OptionsController]);

  app.controller('ListingsController', ['$scope', '$state', ListingsController]);

  app.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('options', {
      url: '/options?coordinates&maxprice&minrooms',
      templateUrl: 'options.html'
    }).state('listings', {
      url: '/listings?coordinates&maxprice&minrooms',
      templateUrl: 'listings.html'
    });

  });

})();