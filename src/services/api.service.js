// Get the tile server url from a given layer configuration
export function getLayerUrl(layer) {
  return fetch(layer.apiUrl, {
    method: 'POST',
    headers: HEADERS,
    body: _buildBody([layer]),
  })
    .then(data => data.json())
    .then(data => `https://ashbu.cartocdn.com/documentation/api/v1/map/${data.layergroupid}/0/{z}/{x}/{y}.png`);
}

export function getGroupLayerUrl(layers, apiUrl) {
  return fetch(apiUrl, {
    method: 'POST',
    headers: HEADERS,
    body: _buildBody(layers),
  })
    .then(data => data.json())
    .then(data => `https://ashbu.cartocdn.com/documentation/api/v1/map/${data.layergroupid}/{{layers}}/{z}/{x}/{y}.png`);
}

const HEADERS = new Headers({
  'Content-Type': 'application/json'
});

function _buildBody(layers) {
  return JSON.stringify({
    layers
  });
}
