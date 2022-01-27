angular.module('app.controllers', [])

.controller('appCtrl', function($scope, $state) {
    console.log("appCtrl init");
})

.controller('homeCtrl', function($scope, $state, SweetAlert2) {
    console.log("homeCtrl init")

    
})

.controller('rootCtrl', function($scope, $state, SweetAlert2, Metamask) {
    $scope.account = "";
    $scope.installed = false;
    $scope.pending = false;
    $scope.connected = false;

    $scope.roadmap = function() {
        Swal.fire({
            toast: true,
            position: 'top-right',
            iconColor: 'white',
            customClass: {
            popup: 'colored-toast'
            },
            showConfirmButton: false,
            timer: 15000,
            timerProgressBar: true,
            icon: 'success',
            title: 'Yokai Oni plan will be revealed soon'
        })
    }

    $scope.audit = function() {
        Swal.fire({
            toast: true,
            position: 'top-right',
            iconColor: 'white',
            customClass: {
            popup: 'colored-toast'
            },
            showConfirmButton: false,
            timer: 15000,
            timerProgressBar: true,
            icon: 'success',
            title: 'Yokai Oni CA audit will arise before sunrise'
        })
    }

    $scope.connect = function() {
        Metamask.connect().then(
            function(account) {
                $scope.connected = true;
                $scope.account = account;
            },
            function(err) {
                if (err.code === -32002) {
                    $scope.pending = true;
                }
                console.error(err)
            }
        )
    }

    function enter() {
        if (Metamask.is_installed()) {
            $scope.installed = true;
            Metamask.is_connected().then(
                function(account) {
                    $scope.connected = true;
                    $scope.account = account;
                },
                function(err) {
                    if (err === "pending") {
                        $scope.pending = true;
                    } else {
                        console.error(err)
                    }
                }
            )
        }
        else {
            $scope.installed = false;
        }
    }
    enter()
})

.controller('subCtrl', function($scope, $state, $stateParams) {
    $scope.id = $stateParams.id;

    $scope.foo = (data) => {
        alert(data);
    };
})