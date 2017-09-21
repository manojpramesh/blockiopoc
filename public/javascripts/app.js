var app = angular.module("blockioApp", []);


app.controller('homeCtrl', function($scope, $http, $interval, $q) {
    $scope.toAddress = "n1WKCkmMQ5Dt2MtFhAuL52Txh8zDZXbaqh";
    $scope.amount = 10;
    $scope.address = [];

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


    $scope.getAllAddress = function() {
        $scope.address = [];
        var i = 0;
        $http.get('/getaddressesbyaccount').then(function(res) {
            for (var index = 0; index < res.data.length; index++) {
                getBalance(res.data[index]).then(function(balance) {
                    $scope.address.push({
                        "address": res.data[i],
                        "balance": balance.data
                    });
                    i++;
                });
            }
        }, function(err) {
            console.log(err);
        });
    }

    $scope.getAllAddress();


    var getBalance = function(address) {
        var data = "";
        return $http.get('/getreceivedbyaddress?address=' + address);
    }


    $scope.getnewaddress = function() {
        $http.get('/getnewaddress').then(function(res) {
            $scope.address.push({
                "address": res.data,
                "balance": 0
            });
        }, function(err) {});
    }
});