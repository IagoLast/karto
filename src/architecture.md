# Architecture

## Components & Terminology

* **Service** - A non-instantiable object/singleton which provides some functionality.
  * `api.service` : Handles the interaction with the server to obtain the tile server url
  * `config.serice`: Provides the funcitonality to parse arbitrary json files and convert them in valid MapConfig objects.
  * `render.service`: Provides all the funcionality needed to actualy draw the map. In this case using leaflet but could be replaced by another one using google-maps.
* **Class** - A javascript syntax sugar for prototypes equivalent to a classic Object oriented class.
  * `Layer` : Offers a series of methods to interact with a map-layer: hide,show,changeSQL... should be agnostic to the used render library.
  * `Karto` : Currently only offers a method to load a map from a config object. It also creates and keeps a list of Layer objects.

![Architecture Diagram](https://raw.githubusercontent.com/IagoLast/karto/master/architecture.png)
