var map;

export function initMap(options, mapId = 'map') {
  map = new google.maps.Map(document.getElementById(mapId), {
    center: {
      lat: options.center[0],
      lng: options.center[1]
    },
    zoom: options.zoom,
  });
}

export function hide(layer) {
  map.overlayMapTypes.removeAt(layer.config.zIndex);
}

export function show(layer) {
  map.overlayMapTypes.insertAt(layer.config.zIndex, layer.view);
}

export function create(url) {
  return new google.maps.ImageMapType({
    getTileUrl: function(coord, zoom) {
      let template = url;
      template = template.replace('{x}', coord.x);
      template = template.replace('{y}', coord.y);
      template = template.replace('{z}', zoom);
      return template;
    },
    maxZoom: 18,
    minZoom: 0,
    name: url,
  });
}


export default {
  initMap,
  create,
  hide,
  show,
};
