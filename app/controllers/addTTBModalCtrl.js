(function(){
  angular.module("bradApp")
    .controller('AddTTBModalCtrl', function($scope, $modalInstance, CRUD){
      $scope.companies=[];
      $scope.users = [];
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
      $scope.add = function() {
        if($scope.newTicket && Object.keys($scope.newTicket).length == 9) {
          var request = [{
            type: 'create',
            query: {
              what: 'tickets',
              criteria: {
                newTicket: $scope.newTicket
              }
            }
          }];
          // Check for $scope.newTicket.submitted_by(owner,supporting) in users.  If it doesn't exist, add it to the database.
          CRUD.option(request)
            .then(function(response){
              $modalInstance.close();
            });
        } else {
          alert('All fields are required.');
        }
      };
    });
})();
