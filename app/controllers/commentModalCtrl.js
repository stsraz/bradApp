(function(){
  angular.module("bradApp")
    .controller('CommentModalCtrl', function($scope, $modalInstance, CRUD, comments, ttb){
      $scope.comments = comments;
      $scope.ttb = ttb;

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
          CRUD.option(request).
            then(function(response) {
              $scope.close();
            });
        } else {alert('Please enter values in all fields before submitting.')}
      };
    });
})();
