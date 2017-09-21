var app = angular.module("blockioApp", []);


app.controller('homeCtrl', function($scope, $http, $interval) {
    $scope.toAddress = "n1WKCkmMQ5Dt2MtFhAuL52Txh8zDZXbaqh";
    $scope.amount = 10;

    $scope.updateStatus = function() {
        $http.get('/getInfo').then(function(res) {
            $scope.blocks = res.data.blocks;
            $scope.difficulty = res.data.difficulty;
            $scope.relayfee = res.data.relayfee;
            $scope.balance = res.data.balance;
        }, function(err) {});
    }

    $scope.sendBitcoin = function() {
        var query = {
            address: $scope.toAddress,
            amount: $scope.amount
        };
        $http.post('/sendTransaction', query).then(function(response) {
            $scope.txMessage = "Transaction sent successfully. Tx: " + response.data;
            $scope.updateStatus();
        });
    }

    $interval($scope.updateStatus, 1000);
});