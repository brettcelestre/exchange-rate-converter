
angular.module('ExchangeRateConverter.converter.service', [])

.service('ConverterService', function($http, HomeController) {

  // Sends user data to /rates post route
  let rates = function(data) {
    return $http({
      method: 'POST',
      url: '/rates',
      data: JSON.stringify(data)
    }).then(function(data) {
      if ( data.status === 200 ) {

      }
      return data;
    }, function(error) {
      return error;
    });
  };

  return {
    rates: rates
  };

});
