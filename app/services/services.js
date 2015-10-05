(function(){
  angular.module("bradApp")
    .factory('CRUD', function($http) {
      var getAll = function() {
        var payload = 'all';
        return $http.post('backend/crud.php', payload)
          .then(function (response) {
            return response.data;
          });
      }
      return {
        getIssues: function(data) {
          return $http.post('backend/hub.php', data)
            .then(function(response) {
              return response.data;
          });
        },
        option: function(input) {
          switch (input) {
            case 'all':
              return getAll();
              break;
          };
        }
      };
    });
})();
