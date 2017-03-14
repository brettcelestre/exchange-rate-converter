
angular.module('ExchangeRateConverter.home.service', [])

.service('HomeService', function($http) {

  let appid = {
    'id': ''
  }

  // Stores App ID in appid
  let storeID = function(data) {
    appid['id'] = data
  };

  return {
    appid: appid,
    storeID: storeID
  };

});
