(function(){
  angular.module("bradApp")
    .controller('AppController', function($scope, CRUD, $modal){
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
      // Initialize Ticket and Comment Arrays
      $scope.tickets = [];
      $scope.comments = [];
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
              controller: 'ModalInstanceCtrl',
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
    });
})();
