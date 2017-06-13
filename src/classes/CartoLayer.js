import Layer from './Layer.js';

export default class CartoLayer extends Layer {
  constructor(layerConfig, {renderService, apiService}) {
    super(layerConfig, {
      renderService,
      apiService
    });
    this._subLayers = layerConfig.subLayers;
  }

  hide(index) {
    this.renderService.hide(this);
    // Hide the layer with the given index and show the rest
    if (this._isDefined(index)) {
      let url = this._createUrl(index, false);
      this.view = this.renderService.create(url);
      this.show();
    }
  }


  show(index) {
    console.log(this.url);
    // Add the layer with the given index to the url
    if (this._isDefined(index)) {
      let url = this._createUrl(index, true);
      this.view = this.renderService.create(url);
    }
    this.renderService.show(this);
  }

  setSQL(sql, index) {
    if (!this._isDefined(index)) {
      this.config.subLayers.forEach(subLayer => {
        subLayer.options.sql = sql;
      });
    } else {
      this.config.subLayers[index].options.sql = sql;
    }
    this.hide();
    return this._getTileUrl().then(this.create.bind(this)).then(this.show.bind(this));
  }

  _createUrl(index, visible) {
    throw new Error('Not implemented');
  // let visibleLayers_ = this.url.split(':0')[1].split('{z}')[0];
  // let visibleLayers = visibleLayers_.replace(index, '');
  // visibleLayers = visibleLayers.replace(',,', ',');
  // let url = this.url.replace(visibleLayers_, visibleLayers);
  }

  _getTileUrl() {
    return this.apiService.getGroupLayerUrl(this.config);
  }

  _isDefined(value) {
    return value !== undefined && value !== null;
  }
}
