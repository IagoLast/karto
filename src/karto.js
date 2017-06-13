import LayerFactory from './classes/LayerFactory.js';
import * as configService from './services/config.service.js';
import * as apiService from './services/api.service.js';
import LayerGroup from './classes/LayerGroup.js';

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
    this.layerGroup = new LayerGroup(INYECTED_DEPENDENCES);
    this.factory = new LayerFactory(INYECTED_DEPENDENCES, this.layerGroup);
  }

  /**
   * Create a new map from a json config.
   * Once the config is correctly parsed and transformed into a `MapConfig` the layers are stored and drawn.
   */
  loadConfig(config) {
    this.config = configService.parse(config);
    renderService.initMap(this.config);
    this.layerGroup.apiUrl = this.config.apiUrl;
    this.layers = this.createLayers(this.config.layers);
    this.initLayers(this.layers).then(this.showLayers);
  }

  // Create a list of layers
  createLayers(layersInfo) {
    return layersInfo.map(this.createLayer.bind(this));
  }

  createLayer(layerInfo, index) {
    layerInfo.zIndex = index;
    layerInfo.apiUrl = this.config.apiUrl;
    return this.factory.create(layerInfo);
  }

  initLayers(layers) {
    return Promise.all(layers.map(layer => layer.init()));
  }

  // Show a list of layers
  showLayers(layers) {
    layers.forEach(layer => layer.show());
  }

}
