angular.module('app.services', [])

.factory('web3js', ['$window', function($window) {
    let web3;
    if (typeof $window.ethereum !== 'undefined') {
        web3 = new Web3($window.ethereum);
    }
    return web3;
}])

.service('Metamask', ['$q', '$window', function($q, $window) {
    let account;

    function is_installed() {
        return  Boolean($window.ethereum && $window.ethereum.isMetaMask);
    };

    function is_connected() {
        return $q(function(resolve, reject) {
            $window.ethereum.request({ method: 'eth_accounts' })
            .then(function(accounts) {
                if (accounts.length > 0) {
                    account = accounts[0];
                    resolve(account)
                }
                reject()
            })
            .catch(function(err) {
                if (err.code === -32002) {
                    console.log("here");
                    reject("pending");
                }
                reject(err)
            })
        })
    }

    function get_account() {
        return $q(function(resolve, reject) {
            $window.ethereum.request({ method: 'eth_accounts' })
            .then(function(accounts) {
                if (accounts.length > 0) {
                    resolve(accounts[0])
                }
                reject(err)
            })
            .catch(function(err) {
                reject(err)
            })
        })
    }

    function connect() {
        return $q(function(resolve, reject) {
            $window.ethereum.request({ method: 'eth_requestAccounts' })
            .then(function(accounts) {
                account = accounts[0];
                resolve(account)
            })
            .catch(function(err) {
                reject(err)
            })
        })
    }

    return {
        is_installed: is_installed,
        is_connected: is_connected,
        connect: connect,
        get_account: get_account,
        account: function(){return account}
    }
}])

.factory('AuthInterceptor', ['$rootScope', '$q', function($rootScope, $q){
    return {
        responseError: function(response) {
            $rootScope.$broadcast({
                401: "notAuthenticated",
                403: "notAuthorized",
                503: "serverDown"
            }[response.status], response);
            return $q.reject(response);
        }
    };
}])

.config(function ($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
})