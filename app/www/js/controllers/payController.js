angular.module('app')
  .controller('payController', ['$scope', '$ionicPopup', '$state', 'SocketService', 'payData', function($scope, $ionicPopup, $state, SocketService, payData) {
    console.log('PAY DATA', payData);
    $scope.qrCode = payData;

    $scope.testReceive = function() {
      SocketService.receivedPayData(payData);
    };

    var confirmTransaction = function(receiverSocketId, payAmt, receiverName) {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Confirm Payment to ' + receiverName,
        template: 'Are you sure you want to pay $' + payAmt + '?'
      });

      // Display Modal
      confirmPopup.then(function(res) {
        if(res) {
          var successCallback = function() {
            $state.go('tab.account');
          };
          var errorCallback = function() {
            // show message to user.
            $state.reload('tab.pay'); //reload to get a new timestamp.
          };

          SocketService.payTransactionConfirmed(receiverSocketId, successCallback, errorCallback);
        } else {
          SocketService.payTransactionDenied(receiverSocketId);
        }
      });
    };

    SocketService.listenConfirmPayTransaction(confirmTransaction);
  }

]);
