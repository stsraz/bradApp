(function(){
  angular.module("bradApp")
    .factory('CRUD', function($http,$q) {
      // This needs to be refactored.  Badly.  But it works.
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
      // Need to finish this after rewriting CRUD
      var searchDB = function(column,filter) {
        var request = [{
          type: 'read',
          query: {
            what: 'search',
            criteria: {
              column: column,
              filter: filter
            }
          }
        }];
        var this_request = postRequest(request);
        return this_request;
      }
      var toDB = function(what, yeah) {
        switch (what) {
          case 'users':
          case 'companies':
            var request = [{
              type: 'create',
              query: {
                what: what,
                criteria: {
                  name: yeah
                }
              }
            }];
            break;
        }
        var this_request = postRequest(request);
        return this_request;
      }
      return {
        // Need to rename option to post for clarity
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
        },
        searchFor: function(column,filter) {
          return searchDB(column,filter);
        },
        addToDB: function(what, yeah) {
          // what is the type, yeah is the thing
          // WHAT?!?! YEAH!!!
          return toDB(what, yeah);
        }
      };
    })
    // This is not necessarily needed at the moment, but it works.
    .factory('myTools', function() {
      var checkArray = function(testString,testArray) {
        var lcase = testString.toLowerCase();
        var inArray = false;
        // Check for testString in testArray.  Return false if not.
        for(var i = 0; i<testArray.length; i++) {
          arrayIndex = testArray[i].name;
          arraylcase = arrayIndex.toLowerCase();
          if(lcase == arraylcase) {
            inArray = true;
          }
        }
        return inArray;
      };
      return {
        checkArray: function(testString,testArray) {
          return checkArray(testString,testArray);
        }
      };
    })
})();
