// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('app', [
  'ionic',
  'btford.socket-io',
  'monospaced.qrcode'
])


  .config(function($stateProvider, $urlRouterProvider, $compileProvider) {

    //Changing imgSrcSanitizationWhiteList from current to new config
    //This lets us render images w/ csrf restrictions enabled during local development.
    var currentImgSrcSanitizationWhitelist = $compileProvider.imgSrcSanitizationWhitelist();
    var newImgSrcSanitizationWhiteList = currentImgSrcSanitizationWhitelist.toString().slice(0, -1) + '|chrome-extension:' + currentImgSrcSanitizationWhitelist.toString().slice(-1);

    $compileProvider.imgSrcSanitizationWhitelist(newImgSrcSanitizationWhiteList);

    $stateProvider
    // Set up an abstract state for auth:
    .state('auth', {
      url: '/auth',
      abstract: true,
      templateUrl: 'templates/auth.html',
      controller: 'authController'
    })

    .state('auth.login', {
      url: '/login',
      views: {
        'auth-login': {
          templateUrl: 'templates/login.html',
          controller: 'loginController'
        }
      }
    })

    .state('auth.signup', {
      url: '/signup',
      views: {
        'auth-signup': {
          templateUrl: 'templates/signup.html',
          controller: 'signupController'
        }
      }
    })

    // Set up an abstract state for the tabs:
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html',
      controller: 'tabsController'
    })

    // Each tab has its own nav history stack:
    .state('tab.account', {
      url: '/account',
      views: {
        'tab-account': {
          templateUrl: 'templates/account.html',
          controller: 'accountController'
        }
      },
      resolve: {
        accountData: function($q, $state, $timeout, SocketService, AuthenticationService) {
          return $q(function(resolve, reject) {
            var errorCallback = $timeout(function() {
              console.log('error getting home');
              AuthenticationService.notAuthenticated();
              $state.go('auth.login');
              reject();
            }, 3000);
            var successCallback = function(home) {
              $timeout.cancel( errorCallback );
              resolve(home);
            };
            console.log('sup');
            return SocketService.getHome(successCallback);
          });
        }
      }
    })


    .state('tab.pay', {
      url: '/pay',
      views: {
        'tab-pay': {
          templateUrl: 'templates/pay.html',
          controller: 'payController'
        }
      },
      resolve: {
        payData: function($q, $state, $timeout, SocketService) {
          return $q(function(resolve, reject) {
            var errorCallback = $timeout(function() {
              console.log('error getting pay data.');
              $state.go('tab.account');
              reject();
            }, 3000);
            var successCallback = function(payData) {
              $timeout.cancel( errorCallback );
              resolve(payData);
            };
            console.log('sup');
            return SocketService.getPayData(successCallback);
          });
        }
      }
    })

    .state('tab.receiveSetPayment', {
      url: '/receive-set-payment',
      views: {
        'tab-receive': {
          templateUrl: 'templates/receiveSetPayment.html',
          controller: 'receiveSetPaymentController'
        }
      }
    })

    .state('tab.receivePayment', {
      url: '/receive-payment',
      views: {
        'tab-receive': {
          templateUrl: 'templates/receivePayment.html',
          controller: 'receivePaymentController'
        }
      },
      params: {
        amount: null
      },
      resolve: {
        receiveData: function($q, $state, $stateParams, $timeout, SocketService) {
          return $q(function(resolve, reject) {
            var errorCallback = $timeout(function() {
              console.log('error getting pay data.');
              $state.go('tab.account');
              reject();
            }, 3000);
            var successCallback = function(receiveData) {
              $timeout.cancel( errorCallback );
              resolve(receiveData);
            };
            // handle rest of validation in controller sending payment.
            if ( !$stateParams.amount ) {
              $state.go('tab.receiveSetPayment');
            }

            return SocketService.getReceiveData(successCallback);
          });
        }
      }
    });

    // If none of the above states are matched, use this as the fallback:
    $urlRouterProvider.otherwise('/auth/login');

  })

  .run(['$rootScope', '$state', 'AuthenticationService',
    function($rootScope, $state, AuthenticationService) {

      $rootScope.$on('$stateChangeStart', function(event, toState) {

        var doRedirectToAuth = !AuthenticationService.isAuthenticated() &&
                                toState.name.indexOf('tab') !== -1;
        var doRedirectToTabs = AuthenticationService.isAuthenticated() &&
                                toState.name.indexOf('auth') !== -1;

        if (doRedirectToAuth) {
          event.preventDefault();
          $state.go('auth.login');
        }


        if (doRedirectToTabs) {
          event.preventDefault();
          $state.go('tab.account');
        }
      });
    }
  ])

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  });
