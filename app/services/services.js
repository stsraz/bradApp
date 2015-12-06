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
      var getTickets = function() {
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
        var this_request = postRequest(request);
        return this_request;
      }
      var getUsers = function() {
        var request = [
          {
            type: 'read',
            query: {
              what: 'users',
              criteria: {}
            }
          }
        ];
        var this_request = postRequest(request);
        return this_request;
      }
      var getCompanies = function() {
        var request = [
          {
            type: 'read',
            query: {
              what: 'companies',
              criteria: {}
            }
          }
        ];
        var this_request = postRequest(request);
        return this_request;
      }
      var getComments = function(ttb) {
        var request = [{
            type: 'read',
            query: {
              what: 'comments',
              criteria: ttb
            }
        }];
        var this_request = postRequest(request);
        return this_request;
      }
      return {
        // Need to rename post for clarity
        option: function(input) {
          return postRequest(input);
        },
        tickets: function() {
          return getTickets();
        },
        users: function() {
          return getUsers();
        },
        companies: function() {
          return getCompanies();
        },
        comments: function(ttb) {
          return getComments(ttb);
        }
      };
    });
})();
