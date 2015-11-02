(function(){
  angular.module("bradApp")
    .controller('AppController', function($scope, CRUD){
      var request = [
        {
          type: 'read',
          query: {
            where: '1'
          }
        }
      ];
      CRUD.option(request).
        then(function(response) {
          $scope.tickets = response;
        });
      $scope.tickets = [
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
    });
})();
