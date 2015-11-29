(function(){
  angular.module("bradApp")
    .controller('AppController', function($scope, CRUD, $modal){
      // Initialize Variables and Arrays
      $scope.tickets = [];
      $scope.comments = [];
      $scope.newComment;
      $scope.commentBy;
      // Pull Active Tickets
      $scope.getTickets = function() {
        // Request object for post ops
        var request = [
          {
            type: 'read',
            query: {
              what: 'all', // comments   single-ttb  search
              criteria: {} // SQL search filters
            }
          }
        ];
        // Automagically Pull Active TTBs on page load.
        CRUD.option(request).
          then(function(response) {
            $scope.tickets = response;
          });
      };
      // Get active tickets on initial load.
      $scope.getTickets();
      // Retrieve Comments and Display in Modal
      $scope.getComments = function(panel) {
        var ttb = $scope.tickets[panel]['ttb'];
        var request = [
          {
            type: 'read',
            query: {
              what: 'comments',
              criteria: ttb
            }
          }
        ];
        //  Call to CRUD to retrieve comments and save.
        CRUD.option(request).
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
              $scope.getTickets();
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
      };
    });
})();
