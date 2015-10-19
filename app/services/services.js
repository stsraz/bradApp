(function(){
  angular.module("bradApp")
    .factory('CRUD', function($http) {
      var postRequest = function(input) {
        var data = input;
        return $http.post('backend/crudOps.php', data)
          .then(function (response) {
            return response.data;
          });
      }
      return {
        option: function(input) {
          return postRequest(input);
        }
      };
    });
})();
