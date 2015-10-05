(function(){
  angular.module("bradApp")
    .controller('AppController', function($scope, CRUD){
      var data = '';
      CRUD.option('all').
        then(function(response) {
          $scope.tickets = response;
        });
      $scope.issues = [
        {
          ttb: 'TTB162829',
          opsconsole: '1234567',
          eon: '123456',
          company: 'Allstream',
          submittedby: 'Danny Lovin',
          slastart: '2015-7-16 4:00 PM MST',
          owner: 'DWood',
          domintl: 'Domestic',
          supporting: 'MHafner',
          issueinfo: 'Down T1',
          issuecomments: 'Working this day and night'
        }
      ];
      CRUD.getIssues(data)
        .then(function(response) {
          $scope.CRUDTest = response;
        });
    });
})();
