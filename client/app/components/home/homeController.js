
angular.module('ExchangeRateConverter.home', ['ExchangeRateConverter.home.service'])

.controller('HomeController', function($scope, $rootScope, HomeService) {

  // App ID
  $scope.appid = '';

  // Error states
  $scope.errorAppIDLength = false
  $scope.errorAppIDInvalid = false

  $scope.addAppId = function() {
    $scope.clearError()
    // Stores users appid in home service
    HomeService.storeID($scope.appid)
  }

  // Removes error message
  $scope.clearError = function() {
    $scope.errorAppIDLength = false
    $scope.errorAppIDInvalid = false
  }

  // Shows error message - rootScope listener
  $rootScope.$on('show-appid-length-error', function() {
    $scope.errorAppIDLength = true
  })

  // Shows length id error message - rootScope listener
  $rootScope.$on('show-appid-invalid-error', function() {
    $scope.errorAppIDInvalid = true
  })

});
