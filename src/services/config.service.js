/**
 * Return a MapConfig object from the given config.json file
 */
export function parse(config) {
  return {
    center: _parseCenter(config.center),
    zoom: config.zoom,
    layers: _getLayers(config.layers),
    apiUrl: _generateUrl(config.maps_api_config),
  };
}

/**
 *  The config.json layer type does not match the MapConfig object expected by carto.
 *  this function fixes some fields to create compatibility.
 */
function _getLayers(layers) {
  return layers.map(_fixLayerType);
}

// Some values in the layer.type doesnt match the expected by the Mapconfig.
function _fixLayerType(layer) {
  if (layer.type === 'CartoDB') {
    layer.type = 'cartodb';
  }
  if (layer.type === 'tiled') {
    layer.type = 'http';
  }
  return layer;
}

// Use the maps_api_config to build an URL. ie: http://documentation.cartodb.com/api/v1/map
function _generateUrl(config) {
  return config.maps_api_template.replace('{user}', config.user_name) + '/api/v1/map';
}

function _parseCenter(center) {
  return JSON.parse(center);
}
