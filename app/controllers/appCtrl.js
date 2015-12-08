(function(){
  angular.module("bradApp")
    .controller('AppController', function($scope, CRUD, myTools, $modal){
      // Initialize Variables
      $scope.tickets = [];
      CRUD.tickets()
        .then(function(response) {
          $scope.tickets = response;
        });
      $scope.comments = [];
      $scope.newComment;
      $scope.commentBy;
      // Retrieve Comments and Display in Modal
      $scope.getComments = function(panel) {
        var ttb = $scope.tickets[panel]['ttb'];
        //  Call to CRUD to retrieve comments and save.
        CRUD.comments(ttb).
          then(function(response) {
            $scope.comments = response;
            var modalInstance = $modal.open({
              animation: $scope.animationsEnabled,
              templateUrl: 'app/partials/commentModal.html',
              controller: 'CommentModalCtrl',
              size: 'lg',
              resolve: {
                comments: function() {
                  return $scope.comments;
                },
                ttb: function() {
                  return ttb;
                }
              }
            });
          });
      };
      $scope.closeTTB = function(panel) {
        var closeTTB = confirm("Close this TTB?");
        var ttb = $scope.tickets[panel]['ttb'];
        var request = [
          {
            type: 'update',
            query: {
              what: 'tickets',
              criteria: {
                columns: ['closed'],
                values: ['yes'],
                filterColumns: ['ttb'],
                filters: [ttb]
              }
            }
          }
        ];
        if(closeTTB) {
          CRUD.option(request).
            then(function(response) {
              CRUD.tickets()
                .then(function(response) {
                  $scope.tickets = response;
                });
            });
        }
      };
      $scope.addTTB = function() {
        var modalInstance = $modal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'app/partials/addTTBModal.html',
          controller: 'AddTTBModalCtrl',
          size: 'lg',
          resolve: {}
        });
        modalInstance.result.then(function(){
          CRUD.tickets()
            .then(function(response) {
              $scope.tickets = response;
            });
        });
      };
    });
})();
