'use strict';

describe('comicsController', function() {

    beforeEach(module('comicsApp'));
    beforeEach(function () {

      var mockConfigService = {
          apiKey: function () {
              return 'obviouslyFake';
          }
      };

      module(function ($provide) {
          $provide.value('configService', mockConfigService);
      });
    });
  
    it('should set comics in scope', inject(function($controller, $httpBackend, comicsService) {

        $httpBackend.whenGET(new RegExp('.*')).respond(
            {
                "data": {
                    "results": [
                        {
                            "id": 42882, 
                            "issueNumber": 6, 
                            "title": "Lorna the Jungle Girl (1954) #6", 
                        }, 
                        {
                           "id": 43092, 
                           "issueNumber": 7, 
                           "title": "Brilliant (2011) #7", 
                        } 
                    ] 
                }
            }
        );

        var scope = {};

        $controller('comicsController', { $scope: scope, comicsService: comicsService });
        $httpBackend.flush();
        var comics = scope.comics;
        expect(comics).toBeDefined();
        expect(comics.length).toBe(2);
        var comic0  = comics[0];
        expect(comic0.id).toBeDefined();
        expect(comic0.id).toEqual(42882);
        var comic1  = comics[1];
        expect(comic1.id).toBeDefined();
        expect(comic1.id).toEqual(43092);
    }));
});