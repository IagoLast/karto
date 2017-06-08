import Karto from './karto.js';

// Download config from server and start the app.
fetch('config.json').then(res => res.json()).then(initApp);

/**
 * App entry point.
 * Create a karto object and set the app config also expose the karto object to easy debugging.
 */
function initApp(config) {
	const karto = new Karto();
	karto.loadConfig(config);
	window.karto = karto;
}
