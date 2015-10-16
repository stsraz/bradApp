(function(){
  angular.module("bradApp")
    .factory('CRUD', function($http) {
      var getAll = function() {
        var data = {
          request: 'all'
        };
        return $http.post('backend/crud.php', data)
          .then(function (response) {
            return response.data;
          });
      }
      return {
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
