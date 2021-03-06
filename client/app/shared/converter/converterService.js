
angular.module('ExchangeRateConverter.converter.service', [])

.service('ConverterService', function($http) {

  var ConverterData = {
    'fromCurrencyAmount': 0,
    'toCurrencyAmount': 0,
    'fromType': 'AED',
    'toType': 'AFN',
    'currencies': {},
    'fromCurrencySelected': 'United Arab Emirates Dirham',
    'toCurrencySelected': 'Afghan Afghani'
  }

  // Sends user data to /rates post route
  var rates = function(data) {
    return $http({
      method: 'POST',
      url: '/rates',
      data: JSON.stringify(data)
    }).then(function(data) {
      if ( data.status === 200 ) {
        return data;
      }
      return data
    }, function(error) {
      return error;
    });
  };

  // Gets all currencies from API
  var getCurrencies = function() {
    return $http({
      method: 'GET',
      url: 'https://openexchangerates.org/api/currencies.json',
    }).then(function(data) {
      if ( data.status === 200 ) {
        // Stores all currencies
        ConverterData.currencies = data.data
      }
    }, function(error) {
      return error;
    });
  }

  return {
    rates: rates,
    getCurrencies: getCurrencies,
    ConverterData: ConverterData
  };

});
