angular.module('app')
  .controller('signupController', ['$scope', function($scope) {
    $scope.data = {};

    $scope.signup = function() {
      var newUser = {
        email: $scope.data.email,
        password: $scope.data.password,
        firstName: $scope.data.firstName,
        lastName: $scope.data.lastName
      };

      console.log(newUser);
    };

  }
]);
