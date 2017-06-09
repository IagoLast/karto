var map;

export function initMap(options, mapId = 'map') {
  map = L.map(mapId, options);
}

export function hide(layer) {
  layer.view.remove();
}

export function show(layer) {
  layer.view.addTo(map);
  layer.view.setZIndex(layer.config.zIndex);
}

export function create(url) {
  return L.tileLayer(url);
}

export function setZIndex(layer, index) {
  layer.view.setZIndex(index);
}


export default {
  initMap,
  create,
  hide,
  show,
  setZIndex,
};
