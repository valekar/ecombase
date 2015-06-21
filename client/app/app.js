var app = angular.module('myApp',['ngRoute']);



app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/Admin.html', {
                templateUrl: '/views/Admin.html',
                controller: 'AdminController'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]).config(['$locationProvider', function($locationProvider) {
    $locationProvider.html5Mode(true);
}]);



