'use strict';

angular.module('comicsApp')
    .controller('comicsController', ['$scope', 'comicsService', function($scope, comicsService) {
      comicsService.getComics().then(
          function(response) {
              $scope.comics = response.data.data.results;
          }
      );
    }])
    .controller('comicController', ['$scope', '$routeParams', 'comicsService', function($scope, $routeParams, comicsService) {
      comicsService.getComic($routeParams.id).then(
          function(response) {
              $scope.comic = response.data.data.results[0];
          }
      );
    }])
;