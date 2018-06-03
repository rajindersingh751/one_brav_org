/**
 * Created by Omkar Dusane on 26-Oct-16.
 */
var bravOrg = angular.module('bravApp', [
  'ngRoute','bravApp.agreement','bravAuthModule','paymentModule','caseServices','noteModule'
]).config(function ($routeProvider) {
  $routeProvider
    .when("/org", { // home page
      templateUrl : 'pages/app.html',
      controller: 'appCtrl'
    });
});

bravOrg.service('orgApi',function ($http,bravAuthData) {
  console.log('orgApi Initialized')
});



bravOrg.controller('sidebarLinksCtrl',function (bravHomeApi) {
  /** Links here */
  var links = [
      // profile or Home
    {
      id: 1,
      title:'Home',
      src: "img/Icons/Home.png",
      href: "#/",
      nest:false
    },
    // {
    //   id: 2,
    //   title:'Note',
    //   src: "img/Icons/Note.png",
    //   href: "#/note/view",
    //   nest:false
    // },
    // {
    //   id: 3,
    //   title:'Mediator',
    //   src: "img/Icons/Mediator.png",
    //   href: "#/mediator",
    //   nest:false
    // },
    // cases
    {
        id: 4,
        title:'Sessions & Cases',
        src: "img/Icons/BravSessions&Cases.png",
        nest:true,        
        sub:
          [
            {
            title:'Create Session',
            src: "img/Icons/NewSession.png",
            href:'#/ms/new'
          },
          {
            title:'All Sessions',
            src: "img/Icons/AllSessions.png",
            href:'#/ms/all'
          },
          {
            title:'Create Case',
            src: "img/Icons/NewCase.png",
            href:'#/case/new'
          },
          {
            title:'All Cases',
            src: "img/Icons/AllCases.png",
            href:'#/case/all'
          }
        ]
    },
    // agreements
    {
      id: 5,
      title:'Agreements',
      src: "img/Icons/Agreements.png",
      nest:true,
      sub:
        [
          {
            title:'Create Agreement',
            src: "img/Icons/New.png",
            href:'#/agreements/new'
          },
          {
            title:'My Drafts',
            src: "img/Icons/MyDrafts.png",
            href:'#/agreements/drafts'
          },
          {
            title:'Shared Drafts',
            src: "img/Icons/DraftsSharedWithMe.png",
            href:'#/agreements/drafts/shared'
          },
          {
            title:'Signing Requests',
            src: "img/Icons/SigningRequests.png",
            href:'#/agreements/requests'
          },
          {
            title:'Signed',
            src: "img/Icons/Signed.png",
            href:'#/agreements/signed'
          }
        ]
    },
    // Payments
    {
      id: 6,
      title:'Payments',
      src: 'img/Icons/Payments.png',
      nest:true,
      disable:true,
      sub:
        [
          {
            title:'Buy a plan',
            src: 'img/Icons/BuyAPlan.png',
            href:'#/plans/buy'
          },
          {
            title:'Current Subscriptions',
            src: 'img/Icons/CurrentSubscriptions.png',
            href:'#/plans/current'
          }
        ]
    },
  ];
  console.log('sidebarLinksCtrl Loaded')
  bravHomeApi.setLinksList(links);
});
