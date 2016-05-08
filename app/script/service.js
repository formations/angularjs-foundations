'use strict';

angular.module('comicsApp')
    .service('comicsService', ['$resource', 'baseURL', 'configService', function($resource, baseURL, configService) {
      this.getComics = function() {
        return $resource(baseURL + '/v1/public/comics', { 'limit': 50, 'apikey': configService.apiKey });
      };
      this.getComic = function(id) {
        return $resource(baseURL + '/v1/public/comics/:id', { 'id': id, 'apikey': configService.apiKey });
      };
    }])
;