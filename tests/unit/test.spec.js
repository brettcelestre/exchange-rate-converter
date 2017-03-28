
describe('Home Component', function(){
  var rootScope, scope, homeController, service;

  // Requires home controller
  beforeEach(module('ExchangeRateConverter.home'));
  // Adds HomeService dependencies
  beforeEach(function(){
    module('ExchangeRateConverter.home.service');
  });

  beforeEach( inject( function($rootScope){
    rootScope = $rootScope;
    scope = $rootScope.$new();
  }));

  describe('homeController', function(){

    beforeEach(inject(function($rootScope, $controller, HomeService){
      service = HomeService;
      scope = $rootScope.$new();
      homeController = $controller('HomeController', {
        $scope: scope,
        $rootScope: rootScope,
        HomeService: service
      });
    }));

    it('should store appid in HomeService', function(){
      var appIdTest = '123456789abc';
      scope.appid = appIdTest;
      scope.addAppId();
      expect(service.appid['id']).to.be.equal('123456789abc');
    });

    it('should clear error booleans', function(){
      scope.errorAppIDLength = true
      scope.errorAppIDInvalid = true
      scope.clearError();
      expect(scope.errorAppIDLength).to.be.equal(false);
      expect(scope.errorAppIDInvalid).to.be.equal(false);
    });
  });

});
