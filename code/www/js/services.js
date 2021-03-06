angular.module('songhop.services', [])
.factory('MyData', function($websocket, $http) {
      // Open a WebSocket connection
      var dataStream;
      var ws = $websocket('ws://html5rocks.websocket.org/echo', $http);

      var collection = [];

      dataStream.onMessage(function(message) {
        collection.push(JSON.parse(message.data));
      });

      var methods = {
        collection: collection,
        get: function() {
          dataStream.send(JSON.stringify({ action: 'get' }));
        }
      };

      return methods;
    });