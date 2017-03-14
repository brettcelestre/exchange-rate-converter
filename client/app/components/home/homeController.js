
angular.module('ExchangeRateConverter.home', [])

.controller('HomeController', function($scope, $rootScope, $state, HomeService) {

  // App ID
  $scope.appid = ''

  // Error states
  $scope.errorAppIDLength = false
  $scope.errorAppIDInvalid = false

  $scope.addAppId = () => {
    $scope.clearError()
    // Stores users appid in home service
    HomeService.storeID($scope.appid)
  }

  // Removes error message
  $scope.clearError = () => {
    $scope.errorAppIDLength = false
    $scope.errorAppIDInvalid = false
  }

  // Shows error message - rootScope listener
  $rootScope.$on('show-appid-length-error', () => {
    $scope.errorAppIDLength = true
  })

  // Shows length id error message - rootScope listener
  $rootScope.$on('show-appid-invalid-error', () => {
    $scope.errorAppIDInvalid = true
  })


});
