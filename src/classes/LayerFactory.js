import Layer from './Layer.js';
import CartoLayer from './CartoLayer.js';

export default class LayerFactory {
  constructor($injector, layerGroup) {
    this.$injector = $injector;
    this.layerGroup = layerGroup;
  }

  create(layerConfig) {
    if (layerConfig.type === 'cartodb') {
      return new CartoLayer(layerConfig, this.layerGroup);
    }
    return new Layer(layerConfig, this.$injector);
  }
}
