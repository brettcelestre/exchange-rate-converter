
angular.module('ExchangeRateConverter.converter', [])

.controller('ConverterController', function($scope, $rootScope, $state, ConverterService, HomeService) {

  $scope.currencyAmount = ConverterService.ConverterData.currencyAmount
  $scope.fromType = ConverterService.ConverterData.fromType
  $scope.toType = ConverterService.ConverterData.toType
  $scope.currencies = ConverterService.ConverterData.currencies
  $scope.currencySelected = ConverterService.ConverterData.currencySelected

  // Sends currency data to /rates API to retrieve conversion rate
  $scope.setFromCurrencyType = (symbol, fullTitle) => {
    // Stores selected in service
    ConverterService.ConverterData.currencySelected = fullTitle;
    ConverterService.ConverterData.fromType = symbol;
  }

  // Sets amount in ConverterService & removes strings
  $scope.setAmount = (amount) => {
    ConverterService.ConverterData.currencyAmount = parseInt(amount.replace(/[^0-9]/g, ''))
    $scope.currencyAmount = ConverterService.ConverterData.currencyAmount
  }

  $scope.convertAmount = () => {
    // Checks if the user has entered an ID
    if ( HomeService.appid['id'].length < 1 ) {
      // Emits length error to HomeController
      $rootScope.$emit('show-appid-length-error');
    } else {
      let data = {
        'fromAmount': $scope.currencyAmount,
        'fromType': $scope.fromType,
        'toType': $scope.toType,
        'appid': HomeService.appid.id
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
    $scope.fromType = ConverterService.ConverterData.fromType
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
