angular.module('app')

  .service('AuthenticationService', ['$http', '$q', '$timeout', 'SocketService', function($http, $q, $timeout, SocketService) {
    var auth = {
      token: undefined,
      isAuthenticated: false
    };
    var timer;
    var activeUser;

    this.login = function(user) {
      return $q(function(resolve, reject) {
        timer = $timeout(function() {
          auth.isAuthenticated = false;
          reject({ errorMessage: 'Socket Timeout' });
        }, 10000);

        $http
          .post('http://localhost:9000/login', user)
          .success(function (data) {
            if (data.error) {
              $timeout.cancel( timer );
              return reject(data.error);
            }
            var successCallback = function() {
              activeUser = user;
              auth.isAuthenticated = true;
              $timeout.cancel( timer );

              resolve({ 'success': true });
            };

            return authenticate(data.token, successCallback);
          })
          .error(function () {
            $timeout.cancel( timer );

            // Erase the token if the user fails to log in
            auth.token = undefined;
            auth.isAuthenticated = false;

            reject({ errorMessage: 'This is an error message.' });
          });
      });
    };

    this.signup = function(newUser) {
      return $q(function(resolve, reject) {
        timer = $timeout(function() {
          auth.isAuthenticated = false;
          reject({ errorMessage: 'Socket Timeout' });
        }, 10000);

        $http
          .post('http://localhost:9000/sign-up', newUser)
          .success(function (data) {
            var successCallback = function() {
              activeUser = newUser;
              auth.isAuthenticated = true;
              $timeout.cancel( timer );

              resolve({ 'success': true });
            };

            return authenticate(data.token, successCallback);
          })
          .error(function () {
            // Erase the token if the user fails to log in
            auth.token = undefined;
            auth.isAuthenticated = false;

            reject({ errorMessage: 'This is an error message.' });
          });
      });
    };

    this.isAuthenticated = function() {
      return auth.isAuthenticated;
    };

    this.notAuthenticated = function() {
      auth.isAuthenticated = false;
    };

    this.getUser = function() {
      return activeUser;
    };

    var authenticate = function(token, successCallback) {
      auth.token = token.trim();

      // Connect Socket & Authenticate!
      return SocketService.connect()
              .authenticate(auth, successCallback);
    };
  }
]);
