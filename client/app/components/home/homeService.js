
angular.module('ExchangeRateConverter.home.service', [])

.service('HomeService', function($http) {

  let appid = ''

  // Stores App ID in appid
  let storeID = function(data) {
    appid = data
    console.log('HomeService ran, appid = ', appid);
  };

  return {
    appid: appid,
    storeID: storeID
  };

});
