(function(){
  angular.module("bradApp")
    .controller('CommentModalCtrl', function($scope, $modalInstance, CRUD, comments, ttb){
      $scope.comments = comments;
      $scope.ttb = ttb;
      $scope.users = [];
      CRUD.users()
        .then(function(response) {
          $scope.users = response;
        });
      $scope.close = function() {
        $modalInstance.close();
      };
      $scope.add = function() {
        if($scope.newComment && $scope.commentBy) {
          var request = [{
              type: 'create',
              query: {
                what: 'comments', // comments   single-ttb  search
                criteria: {
                  ttb: ttb,
                  comment: $scope.newComment,
                  submitted_by: $scope.commentBy
                }
              }
          }];
          // Check for commentBy in users.  If it doesn't exist, add it to the database.
          for(var i = 0; i<users.length; i++) {
            if($scope.commentBy == users[i]) {
              break;  // *********************** THIS ISN'T FINISHED!!!
            }
          }
          CRUD.option(request).
            then(function(response) {
              CRUD.comments(ttb)
                .then(function(response) {
                  $scope.comments = response;
                })
            });
        } else {alert('Please enter values in all fields before submitting.')}
      };
    });
})();
