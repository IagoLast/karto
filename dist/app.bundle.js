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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

/**
 * This is the library main file.
 * This allows to draw a map simply passing a configuraton file.
 * The map is just a list of Layers.
 */
class Karto {
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
    return Promise.all(layersInfo.map(this.addLayer.bind(this))).then(layers => {
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Karto;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api_service_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config_service_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__render_service_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__classes_Layer_js__ = __webpack_require__(2);





/* harmony default export */ __webpack_exports__["a"] = ({
  apiService: __WEBPACK_IMPORTED_MODULE_0__api_service_js__["a" /* default */],
  configService: __WEBPACK_IMPORTED_MODULE_1__config_service_js__["a" /* default */],
  renderService: __WEBPACK_IMPORTED_MODULE_2__render_service_js__["a" /* default */],
  Layer: __WEBPACK_IMPORTED_MODULE_3__classes_Layer_js__["a" /* default */]
});

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
/* harmony export (immutable) */ __webpack_exports__["a"] = Layer;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_injector_service_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__karto_js__ = __webpack_require__(0);



// Download config from server and start the app.
fetch('config.json').then(res => res.json()).then(initApp);

/**
 * App entry point.
 * Create a karto object and set the app config also expose the karto object to easy debugging.
 */
function initApp(config) {
  const karto = new __WEBPACK_IMPORTED_MODULE_1__karto_js__["a" /* default */](__WEBPACK_IMPORTED_MODULE_0__services_injector_service_js__["a" /* default */]);
  karto.loadConfig(config);
  window.karto = karto;
}

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export getLayerUrl */
// Get the tile server url from a given layer configuration
function getLayerUrl(layer) {
  return fetch(layer.apiUrl, {
    method: 'POST',
    headers: HEADERS,
    body: _buildBody(layer)
  }).then(data => data.json()).then(data => `https://ashbu.cartocdn.com/documentation/api/v1/map/${data.layergroupid}/0/{z}/{x}/{y}.png`);
}

const HEADERS = new Headers({
  'Content-Type': 'application/json'
});

function _buildBody(layer) {
  return JSON.stringify({
    layers: [layer]
  });
}

/* harmony default export */ __webpack_exports__["a"] = ({
  getLayerUrl
});

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export parse */
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
  return layers.map(layer => {
    if (layer.type === 'CartoDB') {
      layer.type = 'cartodb';
    }
    if (layer.type === 'tiled') {
      layer.type = 'http';
    }
    return layer;
  });
}

// Use the maps_api_config to build an URL. ie: http://documentation.cartodb.com/api/v1/map
function _generateUrl(config) {
  return config.maps_api_template.replace('{user}', config.user_name) + '/api/v1/map';
}

function _parseCenter(center) {
  return JSON.parse(center);
}

/* harmony default export */ __webpack_exports__["a"] = ({
  parse
});

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export initMap */
/* unused harmony export hide */
/* unused harmony export show */
/* unused harmony export create */
/* unused harmony export setZIndex */
var map;

function initMap(options, mapId = 'map') {
  map = L.map(mapId, options);
}

function hide(layer) {
  layer.view.remove();
}

function show(layer) {
  layer.view.addTo(map);
  layer.view.setZIndex(layer.config.zIndex);
}

function create(url) {
  return L.tileLayer(url);
}

function setZIndex(layer, index) {
  layer.view.setZIndex(index);
}

/* harmony default export */ __webpack_exports__["a"] = ({
  initMap,
  create,
  hide,
  show,
  setZIndex
});

/***/ })
/******/ ]);
//# sourceMappingURL=app.bundle.js.map