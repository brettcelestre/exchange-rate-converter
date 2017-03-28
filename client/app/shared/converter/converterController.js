
angular.module('ExchangeRateConverter.converter', ['ExchangeRateConverter.home.service', 'ExchangeRateConverter.converter.service'])

.controller('ConverterController', function($scope, $rootScope, ConverterService, HomeService, lodash) {

  $scope.fromCurrencyAmount = ConverterService.ConverterData.fromCurrencyAmount
  $scope.toCurrencyAmount = ConverterService.ConverterData.toCurrencyAmount
  $scope.fromType = ConverterService.ConverterData.fromType
  $scope.toType = ConverterService.ConverterData.toType
  $scope.currencies = ConverterService.ConverterData.currencies
  $scope.fromCurrencySelected = ConverterService.ConverterData.fromCurrencySelected
  $scope.toCurrencySelected = ConverterService.ConverterData.toCurrencySelected

  $scope.invalid = false;
  $scope.valid = false;

  // Sets from currency type
  $scope.setFromCurrencyType = function(symbol, fullTitle) {
    // Stores selected in service
    ConverterService.ConverterData.fromCurrencySelected = fullTitle;
    ConverterService.ConverterData.fromType = symbol;
    $scope.fromCurrencyAmount = ConverterService.ConverterData.fromCurrencyAmount
    $scope.fromType = ConverterService.ConverterData.fromType
  }

  // Sets to currency type
  $scope.setToCurrencyType = function(symbol, fullTitle) {
    // Stores selected in service
    ConverterService.ConverterData.toCurrencySelected = fullTitle;
    ConverterService.ConverterData.toType = symbol;
    $scope.toCurrencyAmount = ConverterService.ConverterData.toCurrencyAmount
    $scope.toType = ConverterService.ConverterData.toType
  }

  // Sets amount in ConverterService & removes strings
  $scope.setFromAmount = function(amount) {
    ConverterService.ConverterData.fromCurrencyAmount = parseInt(amount.replace(/[^0-9]/g, ''))
    $scope.fromCurrencyAmount = ConverterService.ConverterData.fromCurrencyAmount
  }

  // Invokes convertAmount on currency input change
  $scope.convertUpdate = lodash.debounce( function() {
    $scope.convertAmount();
  }, 1225);

  // Makes API request with current data
  $scope.convertAmount = function() {
    // Checks if the user has entered an ID
    if ( HomeService.appid['id'].length < 1 ) {
      // Emits length error to HomeController
      $rootScope.$emit('show-appid-length-error');
    } else {
      var data = {
        'fromAmount': $scope.fromCurrencyAmount,
        'fromType': $scope.fromType,
        'toType': $scope.toType,
        'appid': HomeService.appid.id
      }
      // console.log('convertCurrency ran with ', data);

      // Sends API req to /rates with data
      ConverterService.rates(data)
        .then(function(data) {
          // console.log('ConverterService.rates data = THEN', data);
          // If users App ID is incorrect
          if ( data.data.status === 401 && data.data.message == 'invalid_app_id' ) {
            // console.log('invalid app id');
            $rootScope.$emit('show-appid-invalid-error');
          // If status is okay
        } else if ( data.data.status === 200) {
            // console.log('ConverterService.rates data SUCCESS = ', data);
            ConverterService.ConverterData.toCurrencyAmount = data.data.convertedAmount
            $scope.toCurrencyAmount = ConverterService.ConverterData.toCurrencyAmount
          }
        })
        .catch(function(data){
          console.error('Error with login: ', data);
        });
    }
  }

  $scope.init = function() {
    $scope.fromCurrencyAmount = ConverterService.ConverterData.fromCurrencyAmount
    $scope.toCurrencyAmount = ConverterService.ConverterData.toCurrencyAmount
    $scope.fromType = ConverterService.ConverterData.fromType
    $scope.toType = ConverterService.ConverterData.toType
    $scope.currencies = ConverterService.ConverterData.currencies
    $scope.fromCurrencySelected = ConverterService.ConverterData.fromCurrencySelected
    $scope.toCurrencySelected = ConverterService.ConverterData.toCurrencySelected

    ConverterService.getCurrencies()
      .then(function(data) {
        $scope.currencies = ConverterService.ConverterData.currencies
      })
      .catch(function(data){
        console.error('Error with login: ', data);
      });
  }
  $scope.init()

});
