
angular.module('ExchangeRateConverter.home.service', [])

.service('HomeService', function($http) {

  var appid = {
    'id': ''
  }

  // Stores App ID in appid
  var storeID = function(data) {
    appid['id'] = data
  };

  return {
    appid: appid,
    storeID: storeID
  };

});
