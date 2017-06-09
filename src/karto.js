
/**
 * This is the library main file.
 * This allows to draw a map simply passing a configuraton file.
 * The map is just a list of Layers.
 */
export default class Karto {
  constructor($injector) {
    this.$injector = $injector;
    this.renderService = $injector.renderService;
    this.configService = $injector.configService;
    this.Layer = $injector.Layer;
    this.layers = [];
  }

  /**
   * Create a new map from a json config.
   * Once the config is correctly parsed and transformed into a `MapConfig` the layers are stored and drawn.
   */
  loadConfig(config) {
    this.config = this.configService.parse(config);
    this.renderService.initMap(this.config);
    this.addLayers(this.config.layers).then(this.drawLayers);
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
    return this.createLayer(layerConfig).init();
  }

  // Create a new layers
  createLayer(layerConfig) {
    return new this.Layer(layerConfig, this.$injector);
  }
}
