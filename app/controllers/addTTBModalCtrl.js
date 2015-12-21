(function(){
  angular.module("bradApp")
    .controller('AddTTBModalCtrl', function($scope, $modalInstance, CRUD, myTools){
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
        // Validate
        // Update $scope.tickets and check for TTB.  Fail if exists.
        var breakMe = false;
        /// Check for duplicate TTB
        CRUD.tickets()
          .then(function(response) { // Returnes array of objects
            // Loop through active tickets and look for a match.  If found, initiate user error alert.
            response.forEach(function(element) { // Possible performance loss.  Even if finds in element 3, needs to loop all tickets before break.
              if($scope.newTicket.ttb == element.ttb) {
                breakMe = true;
                alert('TTB already exists.  Action cancelled.');
              }
            });
          });
          // Check
          ////////   WORKING TO HERE
        // if($scope.newTicket && Object.keys($scope.newTicket).length == 9) { // This goes away.  Assume validated.
        if(!breakMe) {
          var request = [{
            type: 'create',
            query: {
              what: 'tickets',
              criteria: {
                newTicket: $scope.newTicket
              }
            }
          }];
          CRUD.option(request)
            .then(function(){
              /* var checkNames = [
                  {
                    exists: myTools.checkArray($scope.newTicket.submitted_by,$scope.users),
                    name: $scope.newTicket.submitted_by
                  },
                  {
                    exists: myTools.checkArray($scope.newTicket.owner,$scope.users),
                    name: $scope.newTicket.owner
                  },
                  {
                    exists: myTools.checkArray($scope.newTicket.supporting,$scope.users),
                    name: $scope.newTicket.supporting
                  }
                ];

                if(!checkNames[i].exists { alert('Not Exist');  ///////////////////////////////////// Not working
                  CRUD.addToDB('users', checkedName[i].name)
                    .then(function() {
                      CRUD.users()
                        .then(function(response) {
                          $scope.users = response;
                        });
                    });
                }
              } */
              $modalInstance.close();
            });
        } else {
          alert('All fields are required.');
        }
      };
    });
})();
