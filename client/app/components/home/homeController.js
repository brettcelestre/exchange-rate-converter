
angular.module('ExchangeRateConverter.home', [])

.controller('HomeController', function($scope, $state, HomeService) {

  // App ID
  $scope.appid = '';

  $scope.addAppId = () => {
    console.log('appSubmit ran with ', $scope.appid);
    // Stores users appid in home service
    HomeService.storeID($scope.appid)
  }

  $scope.clearError = () => {
    console.log('clearError ran');
  }

});
