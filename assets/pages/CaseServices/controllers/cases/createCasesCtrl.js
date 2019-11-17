caseServices.controller('createCasesCtrl', function($scope, caseApi, $mdDialog) {
  $scope.caseMessage = "";
  $scope.createCase = function(case1) {
    $scope.case = {title: '', info: ''};
    caseApi.createCase(case1,function(res) {
      $scope.caseMessage = res.message;
      console.log(res.ok);
      // swal({
      //   type: res.ok ? 'success' : 'error',
      //   html: `<h3 class='f3 black-70'> Created a case </h3>
      //           you can create Sessions linked to this case.
      //         `,
      //   showCloseButton: true,
      //   showCancelButton: false,
      //   confirmButtonText:
      //     'Create a Brāv session',
        
      // }).then(function() {
      //     window.location = '#/ms/new';
      // });

      if(res.ok) {
        let sessionCreation = $mdDialog.alert()
          .title('Case Created')
          .textContent('You can create Sessions linked to this case.')
          .ok('Proceed');
        $mdDialog.show(sessionCreation).then(function () {
          window.location = "#/m/select";
        }, function () {});
      }
        
    });
  };

  $scope.jumpToCreateSessions = function () {
    window.location = '#/m/select';
    console.log("jump", "window.location");
  }
});
