import Layer from './Layer.js';
import CartoLayer from './CartoLayer.js';

export default class LayerFactory {
  constructor($injector) {
    this.$injector = $injector;
  }

  create(layerConfig) {
    if (layerConfig.type === 'group') {
      return new CartoLayer(layerConfig, this.$injector);
    }
    return new Layer(layerConfig, this.$injector);
  }
}
