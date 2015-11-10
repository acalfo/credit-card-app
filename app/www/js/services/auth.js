angular.module('app')

  .service('AuthenticationService', ['$http', '$q', '$timeout', 'SocketService', function($http, $q, $timeout, SocketService) {
    var token;
    var isAuthenticated = false;

    this.login = function(user) {
      var timer;

      return $q(function(resolve, reject) {
        timer = $timeout(function() {
          isAuthenticated = false;
          reject({ errorMessage: 'Socket Timeout' });
        }, 10000);
        $http
          .post('http://localhost:9000/login', user)
          .success(function (data) {
            // Connect Socket!
            var socket = SocketService.connect();

            token = data.token.trim();

            socket.on('connect', function () {
              socket.on('authenticated', function () {
                console.log('Authenticated. Getting Home.');
                isAuthenticated = true;
                $timeout.cancel( timer );

                resolve({ 'success': true });
                // Do this in resolved tabs route.

                // socket.on('home', function(socket) {
                //   console.log('IN HOME! Socket: ', socket);
                // })
                // .emit('getHome', {token: token});
              })
              .emit('authenticate', { token: token }); //send the jwt
            });
          })
          .error(function () {
            // Erase the token if the user fails to log in
            token = undefined;
            isAuthenticated = false;

            reject({ errorMessage: 'This is an error message.' });
          });
      });
    };

    this.isAuthenticated = function() {
      return isAuthenticated;
    };
  }
]);
