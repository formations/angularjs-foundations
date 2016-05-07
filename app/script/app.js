'use strict';

angular.module('comicsApp', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/about', {
                templateUrl : 'view/about.html'
            })
            .when('/home', {
                templateUrl : 'view/home.html'
            })
            .when('/comics', {
                templateUrl : 'comics.html',
                controller  : 'comicsController'
            })
            .otherwise('/home');
    }])
;