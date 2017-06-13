export default class LayerGroup {
  constructor({renderService, apiService}) {
    this.layers = [];
    this.renderService = renderService;
    this.apiService = apiService;
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
    this._updateVisibility();
    this.view = this.renderService.create(this.url);
    this.renderService.show(this);
  }

  // Called when some layer has changed its config
  updateUrl() {
    return this._getTileUrl();
  }

  _updateVisibility() {
    let visibleLayers = [];
    this.layers.forEach((layer, index) => {
      if (layer.visible) {
        visibleLayers.push(index);
      }
    });
    this.url = this.urlTemplate.replace('{{layers}}', visibleLayers.join(','));
  }

  _getTileUrl() {
    return this.apiService.getGroupLayerUrl(this.layers, this.apiUrl).then(urlTemplate => {
      this.urlTemplate = urlTemplate;
    });
  }
}
