angular.module('app')
  .controller('receiveSetPaymentController', ['$scope', '$state', function($scope, $state) {

    $scope.paymentSet = function(amount) {
      console.log('payment set', amount, typeof amount);
      if (amount > 0 && typeof amount === 'number') {
        $state.go('tab.receivePayment', { amount: amount });
      } else {
        $scope.error = 'something';
      }
    };
  }
]);
