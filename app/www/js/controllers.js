
angular.module('app.controllers', ['ionic'])

/*
Controller for the accounts page
*/
.controller('AccountCtrl', function($scope) {

})

/*
Controller for the discover page
*/
.controller('PayCtrl', function($scope, $location) {


})


/*
Controller for the favorites page
*/
.controller('ReceiveCtrl', function($scope) {

})


/*
Controller for our tab bar
*/
.controller('TabsCtrl', function($scope) {

})

/*
Controller for our tab bar
*/
.controller('AuthCtrl', function($scope) {

})

/*
Controller for our tab bar
*/
.controller('LoginCtrl', function(AuthenticationService, $scope) {
  $scope.data = {};

  $scope.login = function() {
    var user = {
      email: $scope.data.email,
      password: $scope.data.password
    };

    console.log(user);

    AuthenticationService.login(user);
  };
})

/*
Controller for our tab bar
*/
.controller('SignupCtrl', function($scope) {
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
});
