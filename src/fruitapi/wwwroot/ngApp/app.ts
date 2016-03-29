namespace fruitapi {

    angular.module('fruitapi', ['ui.router', 'ngResource', 'ui.bootstrap']).config((
        $stateProvider: ng.ui.IStateProvider,
        $urlRouterProvider: ng.ui.IUrlRouterProvider,
        $locationProvider: ng.ILocationProvider
    ) => {
        // Define routes
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '/ngApp/home.html',
                controller: fruitapi.Controllers.HomeController,
                controllerAs: 'controller'
            })
            .state('fruitList', {
                url: '/fruit',
                templateUrl: '/ngApp/fruitList.html',
                controller: fruitapi.Controllers.FruitListController,
                controllerAs: 'controller'
            })
            .state('fruitEdit', {
                url: '/edit/:id',
                templateUrl: '/ngApp/fruitEdit.html',
                controller: fruitapi.Controllers.FruitEditController,
                controllerAs: 'controller'
            })
            .state('fruitCreate', {
                url: '/add',
                templateUrl: '/ngApp/fruitCreate.html',
                controller: fruitapi.Controllers.FruitCreateController,
                controllerAs: 'controller'
            })
            .state('notFound', {
                url: '/notFound',
                templateUrl: '/ngApp/notFound.html'
            });

        // Handle request for non-existent route
        $urlRouterProvider.otherwise('/notFound');

        // Enable HTML5 navigation
        $locationProvider.html5Mode(true);
    });

}
