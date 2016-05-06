'use strict';

angular.module('comicsApp', [])
    .controller('comicsController', ['$scope', 'comicsService', function($scope, comicsService) {
      $scope.tabIndex = 0;
      $scope.titleFilter = '';
      $scope.isSelected = function(tabIndex) {
        return $scope.tabIndex === tabIndex;
      };
      $scope.select = function(tabIndex) {
        $scope.tabIndex = tabIndex;
        switch (tabIndex) {
          case 0: $scope.titleFilter = '';
              break;
          case 1: $scope.titleFilter = 'Powers';
              break;
          case 2: $scope.titleFilter = 'Star Wars: Chewbacca';
              break;
          case 3: $scope.titleFilter = 'Ultimate Spider-Man';
              break;
          case 4: $scope.titleFilter = 'Captain Marvel';
              break;
        }
      };
      $scope.comics = comicsService.getComics();
    }])
;