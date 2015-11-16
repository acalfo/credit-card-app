angular.module('app')
  .controller('accountController', ['$scope', 'accountData', function($scope, accountData) {

    console.log('here', accountData);
    $scope.creditBalance = accountData.credit_balance;
    $scope.debitBalance = accountData.debit_balance;
  }
]);
