
angular.module('ExchangeRateConverter.converter', [])

.controller('ConverterController', function($scope, $rootScope, $state, ConverterService, HomeService) {

  $scope.fromCurrencyAmount = ConverterService.ConverterData.fromCurrencyAmount
  $scope.toCurrencyAmount = ConverterService.ConverterData.toCurrencyAmount
  $scope.fromType = ConverterService.ConverterData.fromType
  $scope.toType = ConverterService.ConverterData.toType
  $scope.currencies = ConverterService.ConverterData.currencies
  $scope.fromCurrencySelected = ConverterService.ConverterData.fromCurrencySelected
  $scope.toCurrencySelected = ConverterService.ConverterData.toCurrencySelected

  // Sets from currency type
  $scope.setFromCurrencyType = (symbol, fullTitle) => {
    // Stores selected in service
    ConverterService.ConverterData.fromCurrencySelected = fullTitle;
    ConverterService.ConverterData.fromType = symbol;
  }

  // Sets to currency type
  $scope.setToCurrencyType = (symbol, fullTitle) => {
    // Stores selected in service
    ConverterService.ConverterData.toCurrencySelected = fullTitle;
    ConverterService.ConverterData.toType = symbol;
  }

  // Sets amount in ConverterService & removes strings
  $scope.setFromAmount = (amount) => {
    ConverterService.ConverterData.fromCurrencyAmount = parseInt(amount.replace(/[^0-9]/g, ''))
    $scope.fromCurrencyAmount = ConverterService.ConverterData.fromCurrencyAmount
  }

  $scope.convertAmount = () => {
    // Checks if the user has entered an ID
    if ( HomeService.appid['id'].length < 1 ) {
      // Emits length error to HomeController
      $rootScope.$emit('show-appid-length-error');
    } else {
      let data = {
        'fromAmount': $scope.fromCurrencyAmount,
        'fromType': $scope.fromType,
        'toType': $scope.toType,
        'appid': HomeService.appid.id
      }
      console.log('convertCurrency ran with ', data);

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
    $scope.fromCurrencyAmount = ConverterService.ConverterData.fromCurrencyAmount
    $scope.toCurrencyAmount = ConverterService.ConverterData.toCurrencyAmount
    $scope.fromType = ConverterService.ConverterData.fromType
    $scope.toType = ConverterService.ConverterData.toType
    $scope.currencies = ConverterService.ConverterData.currencies
    $scope.fromCurrencySelected = ConverterService.ConverterData.fromCurrencySelected
    $scope.toCurrencySelected = ConverterService.ConverterData.toCurrencySelected

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
