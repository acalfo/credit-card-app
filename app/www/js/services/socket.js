angular.module('app')

.factory('SocketService', [
  function() {
    var socket;
    var auth;

    var connect = function() {
      socket = io.connect('http://localhost:9000', {'sync disconnect on unload': true});

      return this;
    };

    var authenticate = function(_auth, successCallback) {
      if (!socket || !_auth.token) {
        return false;
      }
      console.log('authenticating');
      auth = _auth;
      socket.on('connect', function () {
        socket.on('authenticated', function () {
          console.log('Authenticated. Getting Home.');
          successCallback();

          return this;
        })
        .emit('authenticate', { token: auth.token }); //send the jwt
      });
      socket.on('disconnect', function() {
        console.log(socket);
        socket.subs.forEach(function(sub) {
          sub.destroy();
        });
        delete socket._callbacks.disconnect[socket.ids];
        auth.isAuthenticated = false;
      });
    };

    var getHome = function(successCallback) {
      console.log('in get home');
      if (!socket) {
        throw new Error();
      }
      console.log('socket found, emitting getHome', auth.token);
      socket.on('home', function(homeSocket) {
        console.log('IN HOME SOCKET', homeSocket);
        successCallback(homeSocket);

        return this;
      }) //TODO CHECK IF TOKEN IS REQUIRED.
      .emit('getHome', { 'token': auth.token });
    };

    var getPayData = function(successCallback) {
      console.log('in get pay');
      if (!socket) {
        throw new Error();
      }
      console.log('socket found, emitting getPayData', auth.token);
      socket.on('payData', function(payData) {
        console.log('got pay data', payData);
        successCallback(payData);

        return this;
      })
      .emit('getPayData');
    };

    var getReceiveData = function(successCallback) {
      if ( !socket ) {
        throw new Error();
      }
      console.log('emitting getReceiveData');
      socket.on('receiveData', function(receiveData) {
        console.log('received');
        successCallback(receiveData);
      })
      .emit('getReceiveData');
    };

    var receivedPayData = function(payData, receiveData) {
      if (!socket) {
        throw new Error();
      }
      console.log('emitting receivedPayData', payData);
      socket.on('confirmReceivedPayment', function() {
        console.log('confirm payment socket event received');
      })
      .on('receiver:payTransactionConfirmed', function() {
        console.log('receiver, pay transaction confirmed!');
        socket
          .on('receivedPayTransactionComplete', function() {
            // Call success callback (route to account)
            console.log('receivedPayTransactionComplete.');
          })
          .emit('receivedPayTransactionConfirmed');
      })
      .emit('receivedPayData', { 'payData': payData, 'receiveData': receiveData });
    };

    var listenConfirmPayTransaction = function(confirmationCallback) {
      if ( !socket ) {
        throw new Error();
      }

      socket.on('confirmPayTransaction', function(receiverSocketId, payAmt, receiverName) {
        confirmationCallback(receiverSocketId, payAmt, receiverName);
        return this;
      });
    };

    var payTransactionConfirmed = function(receiverSocketId, successCallback, errorCallback) {
      if ( !socket ) {
        throw new Error();
      }

      socket.on('payTransactionComplete', function() {
        successCallback();
        return this;
      })
      .on('payTransactionFailed', function() {
        errorCallback();
        return this;
      });
      console.log('emmitting send transactionApprovalToReceiver');
      // All messages meant for receiver (from payee client) should be sent to server, and then
      // let the server send the message to the receiver client
      socket.emit('sendTransactionApprovalToReceiverSocket', receiverSocketId, 'receiver:payTransactionConfirmed');
    };

    var payTransactionDenied = function() {
      if ( !socket ) {
        throw new Error();
      }
      socket.emit('payTransactionDenied'); // Notify receiver we denied transaction.
    };


    return {
      connect: connect,
      authenticate: authenticate,
      getHome: getHome,
      getPayData: getPayData,
      getReceiveData: getReceiveData,
      receivedPayData: receivedPayData,
      listenConfirmPayTransaction: listenConfirmPayTransaction,
      payTransactionConfirmed: payTransactionConfirmed,
      payTransactionDenied: payTransactionDenied
    };
  }
]);
