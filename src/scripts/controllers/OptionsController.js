var OptionsController = function($scope, $state) {

  $scope.options = $state.params || {};

  var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      osm = L.tileLayer(osmUrl, {maxZoom: 18, attribution: osmAttrib});
      map = new L.Map('map', {layers: [osm], center: new L.LatLng(43.65, -79.39), zoom: 14}),
      drawnItems = L.featureGroup().addTo(map);

  var drawOptions = {
    draw: {
      polyline: false,
      polygon: {
        allowIntersection: false,
        drawError: {
          color: '#e1e100',
          message: 'you can\'t draw that!'
        },
        shapeOptions: {
          color: 'red'
        }
      },
      circle: false,
      rectangle: false,
      marker: false
    },
    edit: {
      featureGroup: drawnItems,
    }
  };

  if ($scope.options.coordinates) {
    var coords = $scope.options.coordinates.map(function(coord){
      return L.latLng(coord.split(','));
    });
    drawnItems.addLayer(new L.polygon(coords));
  }

  var drawControl = new L.Control.Draw(drawOptions);

  map.addControl(drawControl);

  map.on('draw:created', function(event) {
    var layer = event.layer;
    drawnItems.addLayer(layer);
    $scope.options.coordinates = convertLatLng(layer);
    $scope.$apply();
  });

  map.on('draw:edited', function(event) {
    var layers = event.layers;
    layers.eachLayer(function (layer) {
      $scope.options.coordinates = convertLatLng(layer);
      $scope.$apply();
    });
  });

  function convertLatLng(layer) {
    var tempCoords = [];
    latLngs = layer.getLatLngs();
    latLngs.forEach(function(latLng){
      var coords = [latLng.lat, latLng.lng];
      tempCoords.push(coords);
    });
    return tempCoords;
  }

  var edit = new L.EditToolbar.Edit(map, {
    featureGroup: drawControl.options.edit.featureGroup,
    selectedPathOptions: drawControl.options.edit.selectedPathOptions
  });

  $scope.saveOptions = function() {
    $state.transitionTo('listings', $scope.options);
  }

};

module.exports = OptionsController;