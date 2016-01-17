(function() {
  angular.module("bradApp")
    .directive('validationStation', function(CRUD, $q) {
      return {
        require: 'ngModel',
        restrict: 'A',
        link: function (scope, element, attrs, ngModel) {
          // Still working on Validation, not working, need to add async validation as well.
          ngModel.$asyncValidators.duplicate = function(modelValue,viewValue) {
            var value = modelValue || viewValue;
            return CRUD.searchFor(attrs.name,value)
              .then(function(response) {
                if(response.length != 0) {
                  return $q.reject('duplicate');
                } else {
                  return $q.resolve('not');
                }
              },function() {
                return $q.reject('error');
              });
          }
        } // End Link
      } // End Return
    });
})();
