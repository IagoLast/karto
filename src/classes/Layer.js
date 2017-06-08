export default class Layer {
  constructor(layerConfig, {renderService, apiService}) {
    this.config = layerConfig;
    this.renderService = renderService;
    this.apiService = apiService;
  }

  init() {
    return this._getTileUrl().then(this.create.bind(this));
  }

  create(url) {
    this.view = this.renderService.create(url);
    return this;
  }

  hide() {
    this.renderService.hide(this);
  }

  show() {
    this.renderService.show(this);
  }

  setZIndex(index) {
    this.renderService.setZIndex(this, index);
  }

  setSQL(sql) {
    this.config.options.sql = sql;
    this.hide();
    return this._getTileUrl().then(this.create.bind(this)).then(this.show.bind(this));
  }

  _getTileUrl() {
    return this.apiService.getLayerUrl(this.config);
  }
}
