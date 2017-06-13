var map;

export function initMap(options, mapId = 'map') {
  map = L.map(mapId, {
    center: options.center,
    zoom: options.zoom
  });
}

export function hide(layer) {
  layer.view.remove();
}

export function show(layer) {
  layer.view.addTo(map);
}

export function create(url) {
  return L.tileLayer(url);
}


export default {
  initMap,
  create,
  hide,
  show,
};
