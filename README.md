# Karto

The next map engine :D

## Getting started
You must have yarn or npm installed in your local machine.

### Install the dependences

    yarn install

### Build the source

    yarn build
    
### Serve the demo file

    yarn serve

## Architecture 

See [src/architecture.md](https://github.com/IagoLast/karto/blob/master/src/architecture.md)  for more detailed info.

## Karto API

### karto.loadConfig(config: json)
Load a map from a config file

```js
karto.loadConfig(config);
```

**Example**

```js
import Karto from './karto.js';
// Download config from server and start the app.
fetch('config.json').then(res => res.json()).then(config => new Karto().loadConfig(config));
```

### karto.layers
Return a list with the current layers on the map.

**Example**

```js
  karto.layers // (4) [Layer, CartoLayer, Layer, CartoLayer]
```
## Layer API

### layer.hide()
Hide a layer from the map

**Example**

```js
  layer.hide() // Layer is now hidden!
```

### layer.show()
Show a layer on the map

**Example**

```js
  layer.show() // Layer is now visible.
```

## CartoLayer API 

### cartoLayer.setSQL(sql: string)
Updates the SQL of a cartoDB layer.

**Example**

```js
  layer.setSQL('select * from european_countries_e LIMIT 3');
```
