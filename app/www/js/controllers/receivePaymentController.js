angular.module('app')
  .controller('receivePaymentController', ['$scope', 'receiveData', function($scope, receiveData) {
    console.log('GOT RECEIVE DATA!', receiveData);

    if ( !receiveData ) {
      // throw Error / Reload
    }

    // Turn on device camera

    $scope.receivedPayData = function(payData) {

    }
  }
]);
