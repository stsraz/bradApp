(function(){
  angular.module("bradApp")
    .controller('AddTTBModalCtrl', function($scope, $modalInstance, CRUD){

      $scope.close = function() {
        $modalInstance.close();
      };
      $scope.add = function() {

      };
    });
})();
