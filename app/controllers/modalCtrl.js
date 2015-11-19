(function(){
  angular.module("bradApp")
    .controller('ModalInstanceCtrl', function($scope, $modalInstance, comments, ttb){
      $scope.comments = comments;
      $scope.ttb = ttb;

      $scope.close = function() {
        $modalInstance.close();
      };
      $scope.add = function() {
        
      };
    });
})();
