
angular.module('ExchangeRateConverter.converter', [])

.controller('ConverterController', function($scope, $state, ConverterService, HomeService) {

  $scope.currencyAmount = 0
  $scope.currencyType = ''
  $scope.currencies = {}
  $scope.currencySelected = ''

  // Sends currency data to /rates API to retrieve conversion rate
  $scope.convertCurrency = () => {
    // Checks if the user has entered an ID
    if ( HomeService.appid.length < 1 ){
      // Display error
    } else {
      let data = {
        'amount': $scope.currencyAmount,
        'type': $scope.currencyType,
        'appid': HomeService.appid
      }
      console.log('convertCurrency ran', data);

      // Sends API req to /rates with data
      ConverterService.rates(data)
      .then(data => {
        console.log('ConverterService.rates data = ', data);
        // If users App ID is incorrect
          // TODO
        // If success
          // TODO
      })
      .catch(function(data){
        console.error('Error with login: ', data);
      });
    }
  }

  let init = () => {
    ConverterService.getCurrencies()
      .then(data => {
        console.log("DATA", data);
        $scope.currencies = data;
        // Assigned a default selected
        // $scope.currencySelected = data
        // TODO
      })
      .catch(function(data){
        console.error('Error with login: ', data);
      });
  }
  init()

});
