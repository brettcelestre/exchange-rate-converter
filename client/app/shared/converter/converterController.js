
angular.module('ExchangeRateConverter.converter', [])

.controller('ConverterController', function($scope, $state, ConverterService, HomeService) {
  console.log("$scope.currencySelected", $scope.currencySelected);

  $scope.currencyAmount = ConverterService.ConverterData.currencyAmount
  $scope.currencyType = ConverterService.ConverterData.currencyType
  $scope.currencies = ConverterService.ConverterData.currencies
  $scope.currencySelected = ConverterService.ConverterData.currencySelected

  // Sends currency data to /rates API to retrieve conversion rate
  $scope.convertCurrency = (selected) => {
    // Stores selected
    ConverterService.ConverterData.currencySelected = selected;

    // Checks if the user has entered an ID
    if ( HomeService.appid.length < 1 ){
      // Display error
      console.log("Please Enter an API ID");
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

  $scope.init = () => {
    ConverterService.getCurrencies()
      .then(data => {
        $scope.currencies = ConverterService.ConverterData.currencies
      })
      .catch(function(data){
        console.error('Error with login: ', data);
      });
  }
  $scope.init()

});
