
angular.module('ExchangeRateConverter.home.service', [])

.service('HomeService', function($http) {

  let appid = '',
      currencies = {}

  // Stores App ID in appid
  let storeID = function(data) {
    appid = data
    console.log('HomeService ran, appid = ', appid);
  };

  let getCurrencies = () => {
    return $http({
      method: 'GET',
      url: 'https://openexchangerates.org/api/currencies.json',
    }).then(function(data) {
      if ( data.status === 200 ) {
        console.log('HomeService getCurrencies data', data.data);
        currencies = data.data;
      }
    }, function(error) {
      return error;
    });
  }

  return {
    appid: appid,
    storeID: storeID,
    getCurrencies: getCurrencies,
    currencies: currencies
  };

});
