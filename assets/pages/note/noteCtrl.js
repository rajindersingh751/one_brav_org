noteModule.controller('noteCtrl', function ($scope, noteApi) {
 
    $scope.getNotes = function () {
        console.log('In getNotes called');
        noteApi.getNotes(function (res) {           
            console.log('getNotes res ', res);
        });
    };
});