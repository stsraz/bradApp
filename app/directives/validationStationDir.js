(function() {
  angular.module("bradApp")
    .directive('validationStation', function(CRUD) {
      return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
          var valType = attrs.validationType;


          function ttbExists(bool) {
            ngModel.$setValidity('recordChecking', bool);
          }

          ngModel.$parsers.push(function(value) {
            if(!value || value.length ==0) {return;}

            CRUD.checkDB()
          })
        }
      }
    });
})();
