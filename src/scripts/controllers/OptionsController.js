var OptionsController = function($scope) {

  $scope.options = {};

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

  var drawControl = new L.Control.Draw(drawOptions);

  map.on('draw:created', function(event) {
    var layer = event.layer;
    drawnItems.addLayer(layer);
    $scope.options.coordinates = layer._latlngs
    $scope.$apply();
  });

  map.on('draw:edited', function(event) {
    var layers = event.layers;
    layers.eachLayer(function (layer) {
      $scope.options.coordinates = layer._latlngs
    });
  });

  var edit = new L.EditToolbar.Edit(map, {
    featureGroup: drawControl.options.edit.featureGroup,
    selectedPathOptions: drawControl.options.edit.selectedPathOptions
  });

  $scope.createPolygon = function() {
    new L.Draw.Polygon(map, drawControl.options.polygon).enable();
  }

  $scope.editPolygon = function() {
    edit.enable();
  }

  $scope.doneEditing = function() {
    edit.disable();
    edit.save();
  }

  $scope.saveOptions = function() {
    console.log($scope.options);
  }

};

module.exports = OptionsController;