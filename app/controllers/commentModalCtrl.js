(function(){
  angular.module("bradApp")
    .controller('CommentModalCtrl', function($scope, $modalInstance, CRUD, myTools, comments, ttb){
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
          var checkName = myTools.checkArray($scope.commentBy,users);
          if(!checkName) {
            var request = [{
              type: 'create',
              query: {
                what: 'users',
                criteria: {
                  name: $scope.commentBy
                }
              }
            }];
            alert(request);  //////////////  IT"S WORKING
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
