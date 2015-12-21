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
          CRUD.option(request)
            .then(function() {
              CRUD.comments(ttb)
                .then(function(response) {
                  $scope.comments = response;
                  var checkName = myTools.checkArray($scope.commentBy,$scope.users);
                  if(!checkName) {
                    CRUD.addToDB('users', $scope.commentBy)
                      .then(function(){
                        CRUD.users()
                          .then(function(response) {
                            $scope.users = response;
                          });
                      });
                  }
                });
            });
        } else {alert('Please enter values in all fields before submitting.')}
      };
    });
})();
