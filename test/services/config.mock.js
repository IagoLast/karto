export default {
  center: JSON.stringify([10, 11]),
  zoom: 13,
  layers: [
    {
      type: 'CartoDB'
    }, {
      type: 'tiled'
    }
  ],
  maps_api_config: {
    maps_api_template: 'http://{user}/service',
    user_name: 'test-user',
  }
};
