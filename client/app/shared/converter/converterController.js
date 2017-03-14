
angular.module('ExchangeRateConverter.converter', [])

.controller('ConverterController', function($scope, $rootScope, $state, ConverterService, HomeService) {

  $scope.currencyAmount = ConverterService.ConverterData.currencyAmount
  $scope.currencyType = ConverterService.ConverterData.currencyType
  $scope.currencies = ConverterService.ConverterData.currencies
  $scope.currencySelected = ConverterService.ConverterData.currencySelected

  // Sends currency data to /rates API to retrieve conversion rate
  $scope.setCurrency = (selected) => {
    // Stores selected in service
    ConverterService.ConverterData.currencySelected = selected;
  }

  $scope.validateCurrencyAmount = () => {
    // TODO
  }

  $scope.convertAmount = () => {
    // Checks if the user has entered an ID
    if ( HomeService.appid['id'].length < 1 ) {
      // Emits length error to HomeController
      $rootScope.$emit('show-appid-length-error');
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
        // if ( data.status === 22)
          // TODO
        // If App ID error
          // TODO
          // $rootScope.$emit('show-appid-invalid-error');
      })
      .catch(function(data){
        console.error('Error with login: ', data);
      });
    }
  }

  $scope.init = () => {
    $scope.currencyAmount = ConverterService.ConverterData.currencyAmount
    $scope.currencyType = ConverterService.ConverterData.currencyType
    $scope.currencies = ConverterService.ConverterData.currencies
    $scope.currencySelected = ConverterService.ConverterData.currencySelected

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
