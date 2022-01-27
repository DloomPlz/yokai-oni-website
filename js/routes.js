angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

    .state('root', {
        url: '',
        templateUrl: 'templates/root.html',
        controller: 'rootCtrl',
        abstract:true
    })

    .state('root.home', {
        url: '/', // in a controller, use $stateParams.id to access this variable
        views: {
            'content': { // will be injected in templates/root.html @ div ui-view="content"
                templateUrl: 'templates/home.html',
                controller: 'homeCtrl',
                data: {
                    pageTitle: 'Home'
                },
            }
        }
    })

    $urlRouterProvider.otherwise('/')
})

.run(function($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
})
