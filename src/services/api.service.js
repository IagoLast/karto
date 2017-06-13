// Get the tile server url from a given layer configuration
export function getLayerUrl(layer) {
  return fetch(layer.apiUrl, {
    method: 'POST',
    headers: HEADERS,
    body: _buildBody(layer),
  })
    .then(data => data.json())
    .then(data => `https://ashbu.cartocdn.com/documentation/api/v1/map/${data.layergroupid}/0/{z}/{x}/{y}.png`);
}

export function getGroupLayerUrl(layers) {
  return fetch(layers.apiUrl, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(
      {
        layers: layers.subLayers
      }
    ),
  })
    .then(data => data.json())
    .then(data => `https://ashbu.cartocdn.com/documentation/api/v1/map/${data.layergroupid}/${_buildNumLayers(layers.subLayers.length)}/{z}/{x}/{y}.png`);
}

const HEADERS = new Headers({
  'Content-Type': 'application/json'
});

function _buildBody(layer) {
  return JSON.stringify({
    layers: [layer]
  });
}

// Return a formated layer index froma given length.

function _buildNumLayers(length) {
  let indexes = [];
  for (let i = 0; i < length; i++) {
    indexes.push(i);
  }
  return indexes.join(',');
}
