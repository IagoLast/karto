import Layer from './classes/Layer.js';
import * as configService from './services/config.service.js';
import * as apiService from './services/api.service.js';

// Choose a renderService between the standard (leaflet) or the google-maps-one.
import renderService from './services/render.service.js'; // Render layers using leaflet.
// import renderService from './services/render.service.google.js'; // Render layers using google maps

// Layer objects will have renderService and apiService injected.
// This should be done using a proper DI method, but it´s ok for the demo.
const INYECTED_DEPENDENCES = {
  renderService,
  apiService
};

/**
 * This is the library main file.
 * This allows to draw a map simply passing a configuraton file.
 * The map is just a list of Layers.
 */
export default class Karto {
  constructor() {
    this.layers = [];
  }

  /**
   * Create a new map from a json config.
   * Once the config is correctly parsed and transformed into a `MapConfig` the layers are stored and drawn.
   */
  loadConfig(config) {
    this.config = configService.parse(config);
    renderService.initMap({
      center: this.config.center,
      zoom: this.config.zoom,
    });
    this.addLayers(this.config.layers)
      .then(this.drawLayers);
  }

  /**
   * Add a layer list to the Karto map.
   * The `layers` field is a `MapConfig.layers` object. https://carto.com/docs/carto-engine/maps-api/mapconfig
   */
  addLayers(layersInfo) {
    return Promise.all(layersInfo.map(this.addLayer.bind(this)))
      .then(layers => {
        this.layers = layers;
        return layers;
      });
  }

  // Show a list of layers
  drawLayers(layers) {
    layers.forEach(layer => layer.show());
  }

  // Create a new Layer object and add it to the layer list.
  addLayer(layerConfig, $index) {
    layerConfig.zIndex = $index;
    layerConfig.apiUrl = this.config.apiUrl;
    return new Layer(layerConfig, INYECTED_DEPENDENCES).init();
  }
}
