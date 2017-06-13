export default class Layer {
  /**
   * The constructor gets the renderService and the apiService injected by the Karto object
   * This way is easier to mock, test and change implementations.
   */
  constructor(layerConfig, {renderService, apiService}) {
    this.zIndex = layerConfig.zIndex;
    this.config = layerConfig;
    this.renderService = renderService;
    this.apiService = apiService;
    this.visible = false;
  }

  // Get the tile server url
  init() {
    return this._getTileUrl().then(this.create.bind(this));
  }

  // Create a view for this model
  create(url) {
    this.url = url;
    this.view = this.renderService.create(url);
    return this;
  }

  hide() {
    this.visible = false;
    this.renderService.hide(this);
  }

  show() {
    this.visible = true;
    this.renderService.show(this);
  }

  _getTileUrl() {
    if (this.config.options.urlTemplate) {
      return Promise.resolve(this.config.options.urlTemplate);
    }
    return this.apiService.getLayerUrl(this.config);
  }
}
