'use strict';

angular.module('comicsApp')
    .controller('comicsController', ['$scope', 'comicsService', function($scope, comicsService) {
      comicsService.getComics().get(
          function(response) {
              $scope.comics = response.data.results;
          }
      );
    }])
    .controller('comicController', ['$scope', '$routeParams', 'comicsService', function($scope, $routeParams, comicsService) {
      comicsService.getComic($routeParams.id).get(
          function(response) {
              $scope.comic = response.data.results[0];
          }
      );
    }])
;