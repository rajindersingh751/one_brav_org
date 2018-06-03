var noteModule = angular.module('noteModule', ['ngRoute', 'bravAuthModule']);

noteModule.config(function ($routeProvider) {
    $routeProvider
        .when("/note/view", {
            templateUrl: 'pages/note/html/viewNote.html',
            controller: 'noteCtrl'
        });
});

noteModule.service('noteApi', function ($http, bravAuthData) {
  
    this.getNotes = function (next) {
        console.log('In Get Note API request called');
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "/common/api/note/getNotes",
            "method": "GET",
            "headers": {
                "content-type": "application/x-www-form-urlencoded",
                "cache-control": "no-cache",
                "x-access-token": bravAuthData.auth.token
            },
            "params": ""
        }
        $http(settings).success(next);
    };


    this.createNotes = function(next){
        console.log('In Create Note API request called');
    };
});