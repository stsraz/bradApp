(function(){
  angular.module("bradApp")
    .controller('AddTTBModalCtrl', function($scope, $modalInstance, CRUD, myTools){
      $scope.companies = [];
      $scope.users = [];
      $scope.tickets = [];
      $scope.newTicket;
      CRUD.users()
        .then(function(response){
          $scope.users = response;
        })
      CRUD.companies()
        .then(function(response){
          $scope.companies = response;
        })
      $scope.close = function() {
        $modalInstance.close();
      };
      $scope.submitTTB = function() {
        // $modalInstance.close();
      };
  });
})();
