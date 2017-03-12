let routes = require('./app.routes.js'),
    homeController = require('./components/home/homeController.js'),
    converterController = require('./shared/converter/converterController.js'),
    converterService = require('./shared/converter/converterService.js')

angular.module('ExchangeRateConverter', [
  'ui.router',
  'appRoutes',
  'StockSight.home',
  'StockSight.login',
  'StockSight.login.service',
  'StockSight.signup',
  'StockSight.signup.service',
  'StockSight.main.service',
  'StockSight.main',
  'StockSight.main.chart',
  'StockSight.main.chart.service',
  'StockSight.main.sidebar',
  'StockSight.main.stock'
]);
