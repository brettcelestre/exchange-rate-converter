
angular.module('ExchangeRateConverter.converter.service', [])

.service('ConverterService', function($http) {

  let ConverterData = {
    'fromCurrencyAmount': 0,
    'toCurrencyAmount': 0,
    'fromType': 'AED',
    'toType': 'AED',
    'currencies': {},
    'fromCurrencySelected': 'United Arab Emirates Dirham',
    'toCurrencySelected': 'United Arab Emirates Dirham'
  }

  // Sends user data to /rates post route
  let rates = function(data) {
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
  let getCurrencies = () => {
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
