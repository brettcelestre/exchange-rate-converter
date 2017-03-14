let routes = require('./app.routes.js'),
    homeController = require('./components/home/homeController.js'),
    homeService = require('./components/home/homeService.js'),
    converterController = require('./shared/converter/converterController.js'),
    converterService = require('./shared/converter/converterService.js')

angular.module('ExchangeRateConverter', [
  'ui.router',
  'appRoutes',
  'ngLodash',
  'ExchangeRateConverter.home',
  'ExchangeRateConverter.home.service',
  'ExchangeRateConverter.converter',
  'ExchangeRateConverter.converter.service'
]);
