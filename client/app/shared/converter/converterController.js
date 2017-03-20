
angular.module('ExchangeRateConverter.converter', [])

.controller('ConverterController', function($scope, $rootScope, $state, ConverterService, HomeService, lodash) {

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
    $scope.fromCurrencyAmount = ConverterService.ConverterData.fromCurrencyAmount
    $scope.fromType = ConverterService.ConverterData.fromType
  }

  // Sets to currency type
  $scope.setToCurrencyType = (symbol, fullTitle) => {
    // Stores selected in service
    ConverterService.ConverterData.toCurrencySelected = fullTitle;
    ConverterService.ConverterData.toType = symbol;
    $scope.toCurrencyAmount = ConverterService.ConverterData.toCurrencyAmount
    $scope.toType = ConverterService.ConverterData.toType
  }

  // Sets amount in ConverterService & removes strings
  $scope.setFromAmount = (amount) => {
    ConverterService.ConverterData.fromCurrencyAmount = parseInt(amount.replace(/[^0-9]/g, ''))
    $scope.fromCurrencyAmount = ConverterService.ConverterData.fromCurrencyAmount
  }

  // Invokes convertAmount on currency input change
  $scope.convertUpdate = lodash.debounce( () => {
    $scope.convertAmount();
  }, 1500);

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
        console.log('ConverterService.rates data = THEN', data);

        // If users App ID is incorrect
        if ( data.data.status === 401 && data.data.message == 'invalid_app_id' ) {
          console.log('invalid app id');
          $rootScope.$emit('show-appid-invalid-error');
        // If status is okay
      } else if ( data.data.status === 200) {
          console.log('ConverterService.rates data SUCCESS = ', data);
          ConverterService.ConverterData.toCurrencyAmount = data.data.convertedAmount
          $scope.toCurrencyAmount = ConverterService.ConverterData.toCurrencyAmount
        }
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
