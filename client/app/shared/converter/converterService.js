
angular.module('ExchangeRateConverter.converter.service', [])

.service('ConverterService', function($http) {

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

  let getCurrencies = () => {
    return $http({
      method: 'GET',
      url: 'https://openexchangerates.org/api/currencies.json',
    }).then(function(data) {
      if ( data.status === 200 ) {
        return data.data;
      }
    }, function(error) {
      return error;
    });
  }

  return {
    rates: rates,
    getCurrencies: getCurrencies
  };

});
