// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('songhop', ['ionic', 'songhop.controllers', 'btford.socket-io', 'ngWebsocket'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    

  });
})
// .run(function ($websocket, $timeout, $window) {
//  if ("WebSocket" in window) {
//   var ws = new WebSocket("ws://html5rocks.websocket.org/echo");
//   ws.onopen = function() {
//     // Web Socket is connected. You can send data by send() method.
//    ws.send("hello world"); 
//    console.log("hi");
//   };
//   ws.onmessage = function (evt) { var received_msg = evt.data; console.log(evt.data) };
//   ws.onclose = function() { // websocket is closed. 
//   };
// } else {
//   // the browser doesn't support WebSocket.
// }
//     })
// .run(function ($websocket, $timeout, $window) {
//   if ("WebSocket" in $window) {
//     var dataStream = new $websocket('ws://html5rocks.websocket.org/echo');

//       var collection = [];

//       dataStream.onMessage(function(message) {
//         console.log("hello world");
//         collection.push(JSON.parse(message.data));
//       });
        // var ws = $websocket.$new('ws://html5rocks.websocket.org/echo'); // instance of ngWebsocket, handled by $websocket service

        // ws.$on('open', function () {
        //     console.log('Oh my gosh, websocket is really open! Fukken awesome!');

        //     ws.$emit('ping', 'hi listening websocket server'); // send a message to the websocket server

        //     var data = {
        //         level: 1,
        //         text: 'ngWebsocket rocks!',
        //         array: ['one', 'two', 'three'],
        //         nested: {
        //             level: 2,
        //             deeper: [{
        //                 hell: 'yeah'
        //             }, {
        //                 so: 'good'
        //             }]
        //         }
        //     };

        //     ws.$emit('pong', data);
        // });

        // ws.$on('pong', function (data) {
        //     console.log('The websocket server has sent the following data:');
        //     console.log(data);

        // });

        // ws.$on('$close', function () {
        //     console.log('Noooooooooou, I want to have more fun with ngWebsocket, damn it!');
        // });
// }
//     })



.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router, which uses the concept of states.
  // Learn more here: https://github.com/angular-ui/ui-router.
  // Set up the various states in which the app can be.
  // Each state's controller can be found in controllers.js.
  $stateProvider


  // Set up an abstract state for the tabs directive:
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    controller: 'TabsCtrl'
  })

  // Each tab has its own nav history stack:

  .state('tab.discover', {
    url: '/discover',
    views: {
      'tab-discover': {
        templateUrl: 'templates/discover.html',
        controller: 'DiscoverCtrl'
      }
    }
  })

  .state('tab.favorites', {
      url: '/favorites',
      views: {
        'tab-favorites': {
          templateUrl: 'templates/favorites.html',
          controller: 'FavoritesCtrl'
        }
      }
    });
  // If none of the above states are matched, use this as the fallback:
  $urlRouterProvider.otherwise('/tab/discover');

})


.constant('SERVER', {
  // Local server
  //url: 'http://localhost:3000'

  // Public Heroku server
  url: 'https://ionic-songhop.herokuapp.com'
});
