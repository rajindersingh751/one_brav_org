caseServices = angular.module('caseServices', ['ngRoute','bravAuthModule','paymentModule'])
  .config(function ($routeProvider) {
    $routeProvider
        .when("/m/select", { // form
        templateUrl: 'pages/CaseServices/html/selectMediator.html',
        controller: 'selectMediatorCtrl'
      })
      .when("/ms/new", { // form
        templateUrl: 'pages/CaseServices/html/createMediationSession.html',
        controller: 'createSessionsCtrl'
      })
      .when("/ms/all", { // table
        templateUrl : 'pages/CaseServices/html/allSessions.html',
        controller: 'allSessionsCtrl'
      })
      .when("/ms/requests", { // form
        templateUrl: 'pages/CaseServices/html/allRequests.html',
        controller: 'allRequestsCtrl'
      })
      .when("/ms/request", { // form
        templateUrl: 'pages/CaseServices/html/sessionsRequest.html',
        controller:  'sessionsRequestCtrl'
      })
      .when("/ms/schedule", { // form
        templateUrl: 'pages/CaseServices/html/scheduleSession.html',
        controller: 'scheduleSessionCtrl'
      })
      .when("/case/new", { // form
        templateUrl: 'pages/CaseServices/html/createCases.html',
        controller: 'createCasesCtrl'
      })
      .when("/case/all", { // table
        templateUrl: 'pages/CaseServices/html/allCases.html',
        controller: 'allCasesCtrl'
      })
      /**.when("/ms/currentsession", { 
        templateUrl: 'pages/CaseServices/html/mediationSession.html',
        controller: 'mediationSessionCtrl'
      })**/
      .when("/ms/s", { 
        templateUrl: 'pages/CaseServices/html/session.html',
        controller: 'mediationSessionCtrl'
      });       
});
