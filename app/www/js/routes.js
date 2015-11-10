angular.module('app.routes', [])

// .config(function($stateProvider, $urlRouterProvider, $compileProvider) {

// 	//Changing imgSrcSanitizationWhiteList from current to new config
// 	//This lets us render images w/ csrf restrictions enabled during local development.
// 	var currentImgSrcSanitizationWhitelist = $compileProvider.imgSrcSanitizationWhitelist();
// 	var newImgSrcSanitizationWhiteList = currentImgSrcSanitizationWhitelist.toString().slice(0, -1) + '|chrome-extension:' + currentImgSrcSanitizationWhitelist.toString().slice(-1);

// 	$compileProvider.imgSrcSanitizationWhitelist(newImgSrcSanitizationWhiteList);

// 	$stateProvider
//   // Set up an abstract state for the tabs directive:
//   .state('auth', {
//     url: '/auth',
//     abstract: true,
//     templateUrl: 'templates/auth.html',
//     controller: 'AuthCtrl'
//   })

//   .state('auth.login', {
//     url: '/login',
//     views: {
//       'auth-login': {
//         templateUrl: 'templates/login.html',
//         controller: 'LoginCtrl'
//       }
//     }
//   })

//   .state('auth.signup', {
//     url: '/signup',
//     views: {
//       'auth-signup': {
//         templateUrl: 'templates/signup.html',
//         controller: 'SignupCtrl'
//       }
//     }
//   })

// 	// Set up an abstract state for the tabs directive:
// 	.state('tab', {
// 		url: '/tab',
// 		abstract: true,
// 		templateUrl: 'templates/tabs.html',
// 		controller: 'TabsCtrl'
// 	})

// 	// Each tab has its own nav history stack:
// 	.state('tab.account', {
// 		url: '/account',
// 		views: {
// 			'tab-account': {
// 				templateUrl: 'templates/account.html',
// 				controller: 'AccountCtrl'
// 			}
// 		}
// 	})


// 	.state('tab.pay', {
// 		url: '/pay',
// 		views: {
// 			'tab-pay': {
// 				templateUrl: 'templates/pay.html',
// 				controller: 'PayCtrl'
// 			}
// 		}
// 	})

// 	.state('tab.receive', {
// 		url: '/receive',
// 		views: {
// 			'tab-receive': {
// 				templateUrl: 'templates/receive.html',
// 				controller: 'ReceiveCtrl'
// 			}
// 		}
// 	});
// 	// If none of the above states are matched, use this as the fallback:
// 	$urlRouterProvider.otherwise('/auth/login');

// });
