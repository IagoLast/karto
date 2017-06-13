/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__classes_LayerFactory_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_config_service_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_api_service_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__classes_LayerGroup_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_render_service_js__ = __webpack_require__(8);





// Choose a renderService between the standard (leaflet) or the google-maps-one.
 // Render layers using leaflet.
// import renderService from './services/render.service.google.js'; // Render layers using google maps

// Layer objects will have renderService and apiService injected.
// This should be done using a proper DI method, but it´s ok for the demo.
const INYECTED_DEPENDENCES = {
  renderService: __WEBPACK_IMPORTED_MODULE_4__services_render_service_js__["a" /* default */],
  apiService: __WEBPACK_IMPORTED_MODULE_2__services_api_service_js__
};

/**
 * This is the library main file.
 * This allows to draw a map simply passing a configuraton file.
 * The map is just a list of Layers.
 */
class Karto {
  constructor() {
    this.layers = [];
    this.layerGroup = new __WEBPACK_IMPORTED_MODULE_3__classes_LayerGroup_js__["a" /* default */](INYECTED_DEPENDENCES);
    this.factory = new __WEBPACK_IMPORTED_MODULE_0__classes_LayerFactory_js__["a" /* default */](INYECTED_DEPENDENCES, this.layerGroup);
  }

  /**
   * Create a new map from a json config.
   * Once the config is correctly parsed and transformed into a `MapConfig` the layers are stored and drawn.
   */
  loadConfig(config) {
    this.config = __WEBPACK_IMPORTED_MODULE_1__services_config_service_js__["a" /* parse */](config);
    __WEBPACK_IMPORTED_MODULE_4__services_render_service_js__["a" /* default */].initMap(this.config);
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Karto;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class CartoLayer {

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
      type: this.type
    };
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CartoLayer;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Layer {
  /**
   * The constructor gets the renderService and the apiService injected by the Karto object
   * This way is easier to mock, test and change implementations.
   */
  constructor(layerConfig, { renderService, apiService }) {
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Layer;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Layer_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__CartoLayer_js__ = __webpack_require__(1);



class LayerFactory {
  constructor($injector, layerGroup) {
    this.$injector = $injector;
    this.layerGroup = layerGroup;
  }

  create(layerConfig) {
    if (layerConfig.type === 'cartodb') {
      return new __WEBPACK_IMPORTED_MODULE_1__CartoLayer_js__["a" /* default */](layerConfig, this.layerGroup);
    }
    return new __WEBPACK_IMPORTED_MODULE_0__Layer_js__["a" /* default */](layerConfig, this.$injector);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LayerFactory;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class LayerGroup {
  constructor({ renderService, apiService }) {
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
/* harmony export (immutable) */ __webpack_exports__["a"] = LayerGroup;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__karto_js__ = __webpack_require__(0);


// Download config from server and start the app.
fetch('config.json').then(res => res.json()).then(initApp);

/**
 * App entry point.
 * Create a karto object and set the app config also expose the karto object to easy debugging.
 */
function initApp(config) {
  const karto = new __WEBPACK_IMPORTED_MODULE_0__karto_js__["a" /* default */]();
  karto.loadConfig(config);
  window.karto = karto;
}

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["getLayerUrl"] = getLayerUrl;
/* harmony export (immutable) */ __webpack_exports__["getGroupLayerUrl"] = getGroupLayerUrl;
// Get the tile server url from a given layer configuration
function getLayerUrl(layer) {
  return fetch(layer.apiUrl, {
    method: 'POST',
    headers: HEADERS,
    body: _buildBody([layer])
  }).then(data => data.json()).then(data => `https://ashbu.cartocdn.com/documentation/api/v1/map/${data.layergroupid}/0/{z}/{x}/{y}.png`);
}

function getGroupLayerUrl(layers, apiUrl) {
  return fetch(apiUrl, {
    method: 'POST',
    headers: HEADERS,
    body: _buildBody(layers)
  }).then(data => data.json()).then(data => `https://ashbu.cartocdn.com/documentation/api/v1/map/${data.layergroupid}/{{layers}}/{z}/{x}/{y}.png`);
}

const HEADERS = new Headers({
  'Content-Type': 'application/json'
});

function _buildBody(layers) {
  return JSON.stringify({
    layers
  });
}

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = parse;
/**
 * Return a MapConfig object from the given config.json file
 */
function parse(config) {
  return {
    center: _parseCenter(config.center),
    zoom: config.zoom,
    layers: _getLayers(config.layers),
    apiUrl: _generateUrl(config.maps_api_config)
  };
}

/**
 *  The config.json layer type does not match the MapConfig object expected by carto.
 *  this function fixes some fields to create compatibility.
 */
function _getLayers(layers) {
  return layers.map(_fixLayerType);
}

// Group all cartodb layers into a single one.
function _groupLayers(layers) {
  let groupLayer = {
    type: 'group',
    subLayers: layers.filter(layer => layer.type === 'cartodb')
  };
  let l = layers.filter(layer => layer.type !== 'cartodb');
  l.push(groupLayer);
  return l;
}

// Some values in the layer.type doesnt match the expected by the Mapconfig.
function _fixLayerType(layer) {
  if (layer.type === 'CartoDB') {
    layer.type = 'cartodb';
  }
  if (layer.type === 'tiled') {
    layer.type = 'http';
  }
  return layer;
}

// Use the maps_api_config to build an URL. ie: http://documentation.cartodb.com/api/v1/map
function _generateUrl(config) {
  return config.maps_api_template.replace('{user}', config.user_name) + '/api/v1/map';
}

function _parseCenter(center) {
  return JSON.parse(center);
}

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export initMap */
/* unused harmony export hide */
/* unused harmony export show */
/* unused harmony export create */
var map;

function initMap(options, mapId = 'map') {
  map = L.map(mapId, {
    center: options.center,
    zoom: options.zoom
  });
}

function hide(layer) {
  layer.view.remove();
}

function show(layer) {
  layer.view.addTo(map);
}

function create(url) {
  return L.tileLayer(url);
}

/* harmony default export */ __webpack_exports__["a"] = ({
  initMap,
  create,
  hide,
  show
});

/***/ })
/******/ ]);
//# sourceMappingURL=app.bundle.js.map