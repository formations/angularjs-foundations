'use strict';

angular.module('comicsApp')
    .service('comicsService', ['$http', 'baseURL', 'configService', function($http, baseURL, configService) {
      this.getComics = function() {
        var url = baseURL + '/v1/public/comics?limit=50&apikey=' + configService.apiKey;
        return $http.get(url);
      };
      this.getComic = function(id) {
        var url = baseURL + '/v1/public/comics/' + id + '?apikey=' + configService.apiKey;
        return $http.get(url);
      };
    }])
;