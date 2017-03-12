
angular.module('appRoutes', [])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  // Initialize home route
  $urlRouterProvider.when('', '/');
  // Default route
  $urlRouterProvider.otherwise('/');

  $stateProvider

    // Home state config
    .state('home', {
      url: '/',
      // Sets default children ui-views to home.login
      params: {
        autoActivateChild: 'home.converter'
      },
      views: {
        'main': {
          templateUrl: 'app/components/home/homeView.html',
          controller: 'HomeController'
        }
      }
    })

    // Login state config
    .state('home.converter', {
      parent: 'home',
      url: 'converter',
      views: {
        'converter': {
          templateUrl: 'app/shared/converter/converterView.html',
          controller: 'ConverterController'
        }
      }
    });

}])

.run(['$rootScope', '$state', '$stateParams',
  function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    // Listens and invokes anonymous function each for any state change
    $rootScope.$on('$stateChangeSuccess', function(event, toState) {
      var aac;
      if (aac = toState && toState.params && toState.params.autoActivateChild) {
        $state.go(aac);
      }
    });

}]);
