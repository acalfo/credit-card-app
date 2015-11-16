angular.module('app')
  .controller('signupController', ['$scope', '$state', 'AuthenticationService',
    function($scope, $state, AuthenticationService) {
      $scope.data = {};

      $scope.signup = function() {
        var newUser = {
          email: $scope.data.email,
          password: $scope.data.password,
          firstName: $scope.data.firstName,
          lastName: $scope.data.lastName
        };

        AuthenticationService.signup(newUser)
          .then(
            function(response) {
              if (response.success && AuthenticationService.isAuthenticated()) {
                console.info('user authenticated');
                $state.go('tab.account');
              } else {
                $scope.error = 'Error Message';
              }
            }, function(error) {
              $scope.error = error.errorMessage;
            }
          );
      };
    }
  ]
);
