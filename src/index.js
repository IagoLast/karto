import $injector from './services/injector.service.js';
import Karto from './karto.js';

// Download config from server and start the app.
fetch('config.json').then(res => res.json()).then(initApp);

/**
 * App entry point.
 * Create a karto object and set the app config also expose the karto object to easy debugging.
 */
function initApp(config) {
  const karto = new Karto($injector);
  karto.loadConfig(config);
  window.karto = karto;
}
