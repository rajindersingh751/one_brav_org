iApp.controller('accountICtrl', function($scope, bravHomeApi) {
  $scope.user={name:'sample user name',email:'sample_email@brav.org'}
  // $scope.getProfile(function (obj) {
  //   $scope.user = obj ;
  // });

  bravHomeApi.getProfile(function (res) {
  	$scope.user.name = res.name;
  	$scope.user.email = res.email;
  })
});
