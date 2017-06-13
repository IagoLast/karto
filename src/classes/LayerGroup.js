export default class LayerGroup {
  constructor({renderService, apiService}) {
    this.layers = [];
    this.renderService = renderService;
    this.apiService = apiService;
    this.config = {};
    return this;
  }

  init() {
    if (!this.initialized) {
      this.initialized = true;
      return this._getTileUrl().then(() => this);
    }
    return Promise.resolve(this);
  }

  addLayer(layer) {
    this.config.zIndex = layer.zIndex;
    this.layers.push(layer);
  }

  hideLayer() {
    this.reload();
  }

  showLayer() {
    this.reload();
  }

  reload() {
    if (this.view) {
      this.renderService.hide(this);
    }
    let url = this._updateUrl();
    if (url.includes('null')) {
      return;
    }
    this.view = this.renderService.create(url);
    this.renderService.show(this);
  }

  // Called when some layer has changed its config
  updateUrl() {
    return this._getTileUrl();
  }

  _updateUrl() {
    let visibleLayers = [];
    this.layers.forEach((layer, index) => {
      if (layer.visible) {
        visibleLayers.push(index);
      }
    });
    return this.urlTemplate.replace('{{layers}}', visibleLayers.join(',') || null);
  }

  _getTileUrl() {
    return this.apiService.getGroupLayerUrl(this.layers, this.apiUrl).then(urlTemplate => {
      this.urlTemplate = urlTemplate;
    });
  }
}
