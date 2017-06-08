const HEADERS = new Headers({
  'Content-Type': 'application/json'
});


export function getLayerUrl(layer) {
  return fetch(layer.apiUrl, {
    method: 'POST',
    headers: HEADERS,
    body: _buildBody(layer),
  })
    .then(data => data.json())
    .then(data => `https://ashbu.cartocdn.com/documentation/api/v1/map/${data.layergroupid}/0/{z}/{x}/{y}.png`);
}


function _buildBody(layer) {
  return JSON.stringify({
    layers: [layer]
  });
}
