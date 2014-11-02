(function(){

  var $ = require('jquery'),
      L = require('leaflet');

  var angular = require('angular');
  require('angular-ui-router');
  require('leaflet_draw');

  var OptionsController = require('./controllers/OptionsController');
  var MainController = require('./controllers/MainController');

  var app = angular.module('listingScraper', ['ui.router']);

  app.controller('OptionsController', ['$scope', OptionsController]);

  app.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('options', {
      url: '/options',
      templateUrl: 'options.html'
    })

  });

})();