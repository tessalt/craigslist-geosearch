var optionsService = function() {

  function _setOptions(options) {
    for (var prop in options) {
      if (options.hasOwnProperty(prop)) {
        localStorage.setItem(prop, JSON.stringify(options[prop]));
      }
    }
    return _getOptions();
  }

  function _getOptions() {
    return {
      coordinates: JSON.parse(localStorage.getItem('coordinates')) || ''
    }
  }

  return {
    setOptions: _setOptions,
    _getOptions: _getOptions
  }

}

module.exports = optionsService;