angular.module('app')
  .controller('loginController', ['$scope', '$state', 'AuthenticationService', function($scope, $state, AuthenticationService) {
    $scope.data = {};

    $scope.login = function() {
      var user = {
        email: $scope.data.email,
        password: $scope.data.password
      };

      AuthenticationService.login(user)
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
]);
