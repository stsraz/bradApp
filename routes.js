(function(){
  angular.module('bradApp')
  .config(function($routeProvider, $locationProvider){
    $routeProvider.when('/', {
      templateUrl: 'app/partials/main.html',
      controller: 'AppController'
    }).otherwise({redirectTo: '/'});
    $locationProvider.html5Mode(true);
  });
})();
