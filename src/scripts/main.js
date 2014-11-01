(function(){

  var $ = require('jquery'),
      L = require('leaflet');

  var angular = require('angular');
  require('leaflet_draw');

  var OptionsController = require('./controllers/OptionsController');

  var optionsService = require('./services/optionsService');

  var app = angular.module('listingScraper', []);

  app.factory('optionsService', [optionsService]);

  app.controller('OptionsController', ['$scope', 'optionsService', OptionsController]);

})();