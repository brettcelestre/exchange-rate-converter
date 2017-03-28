
describe('Converter Component', function(){

  var rootScope, scope, converterScope, homeScope, converterController, converterService, homeService, homeController;

  beforeEach(module('ExchangeRateConverter.converter'));
  beforeEach(function(){
    module('ExchangeRateConverter.converter.service');
    module('ExchangeRateConverter.home.service');
    module('ExchangeRateConverter.home');
    module('ngLodash');
  });

  beforeEach( inject( function($rootScope){
    rootScope = $rootScope;
    scope = $rootScope.$new();
  }));

  describe('converterController', function(){

    beforeEach(inject(function($rootScope, $controller, ConverterService, HomeService, lodash){
      converterService = ConverterService;
      homeService = HomeService;
      converterScope = $rootScope.$new();
      converterController = $controller('ConverterController', {
        $scope: converterScope,
        $rootScope: rootScope,
        ConverterService: converterService,
        HomeService: homeService,
        HomeController: homeController,
        lodash: lodash
      });
      homeScope = $rootScope.$new();
      homeController = $controller('HomeController', {
        $scope: homeScope,
        $rootScope: rootScope,
        HomeService: homeService,
      });
    }));

    it('should set from currency type', function(){
      converterScope.setFromCurrencyType('ALL', 'Albanian Lek');
      expect(converterService.ConverterData.fromCurrencySelected).toEqual('Albanian Lek');
      expect(converterService.ConverterData.fromType).toEqual('ALL');
      expect(converterScope.fromCurrencyAmount).toEqual(converterService.ConverterData.fromCurrencyAmount);
      expect(converterScope.fromType).toEqual(converterService.ConverterData.fromType);
    });


    it('should set to currency type', function(){
      converterScope.setToCurrencyType('ARS', 'Argentine Peso');
      expect(converterService.ConverterData.toCurrencySelected).toEqual('Argentine Peso');
      expect(converterService.ConverterData.toType).toEqual('ARS');
      expect(converterScope.toCurrencyAmount).toEqual(converterService.ConverterData.toCurrencyAmount);
      expect(converterScope.toType).toEqual(converterService.ConverterData.toType);
    });

    it('should set amount in ConverterService', function(){
      converterScope.setFromAmount('273');
      expect(converterService.ConverterData.fromCurrencyAmount).toEqual(273);
      expect(converterScope.fromCurrencyAmount).toEqual(273);
    });

    it('should set amount remove letters and spaces from string', function(){
      converterScope.setFromAmount('27 abc 9');
      expect(converterService.ConverterData.fromCurrencyAmount).toEqual(279);
      expect(converterScope.fromCurrencyAmount).toEqual(279);
    });

    it('should require appid with length > 1', function(){
      homeService.appid.id = ''
      converterScope.convertAmount();
      // Checks to make sure appid length error was emitted through rootScope
      expect(homeScope.errorAppIDLength).toEqual(true);
    });

    xit('should submit data to /rates and reject incorrect id', function(){
      converterScope.setFromAmount('273');
      converterScope.setFromCurrencyType('ALL', 'Albanian Lek');
      converterScope.setToCurrencyType('ARS', 'Argentine Peso');
      homeService.appid.id = '123incorrectid';
      converterScope.convertAmount();
      // Checks to make sure invalid id error was emitted through rootScope
      expect(homeScope.errorAppIDInvalid).toEqual(true);
    });

  });

});
