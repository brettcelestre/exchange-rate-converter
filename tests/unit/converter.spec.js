
describe('Converter Component', function(){

  var rootScope, scope, converterController, converterService, homeService;

  beforeEach(module('ExchangeRateConverter.converter'));
  beforeEach(function(){
    module('ExchangeRateConverter.converter.service');
    module('ExchangeRateConverter.home.service');
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
      scope = $rootScope.$new();
      converterController = $controller('ConverterController', {
        $scope: scope,
        $rootScope: rootScope,
        ConverterService: converterService,
        HomeService: homeService,
        lodash: lodash
      });
    }));

    it('should have test length', function(){
      expect(scope.testLength).toEqual(4);
    });

  });

});
