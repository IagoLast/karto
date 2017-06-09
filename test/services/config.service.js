/* eslint-env jasmine */
import configService from '../../src/services/config.service.js';
import mockConfig from './config.mock.js';

describe('config.service', () => {
  let config;
  beforeAll(() => {
    config = configService.parse(mockConfig);
  });
  it('Should correct the layer type', () => {
    expect(config.layers[0].type).toBe('cartodb');
    expect(config.layers[1].type).toBe('http');
  });
  it('Should parse the center', () => {
    expect(config.center[0]).toBe(10);
    expect(config.center[1]).toBe(11);
  });
  it('Should generate an apiUrl', () => {
    expect(config.apiUrl).toBe('http://test-user/service/api/v1/map');
  });
});
