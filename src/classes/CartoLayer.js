export default class CartoLayer {

  constructor(layerConfig, layerGroup) {
    this.zIndex = layerConfig.zIndex;
    this.type = layerConfig.type;
    this.options = layerConfig.options;
    this.layerGroup = layerGroup;
    this.visible = false;
    layerGroup.addLayer(this);
  }

  init() {
    return this.layerGroup.init().then(() => {
      return this;
    });
  }

  hide() {
    this.visible = false;
    this.layerGroup.hideLayer(this);
  }

  show() {
    this.visible = true;
    this.layerGroup.showLayer(this);
  }

  setSQL(sql) {
    this.options.sql = sql;
    this.layerGroup.updateUrl().then(() => this.layerGroup.reload());
  }

  // Prevent circular JSON error when sending data to the server.
  toJSON() {
    return {
      options: this.options,
      type: this.type,
    };
  }
}
