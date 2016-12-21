angular
  .module('pongPal', ['ui.router'])
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', siteConfig])

function siteConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      views: {
        'header' : {
          templateUrl: 'views/navbar.html',
          controller: 'NavController',
          controllerAs: 'vm'
        },
        'content' : {
          templateUrl: 'views/home.html',
          controller: 'MainController',
          controllerAs: 'vm'
        },
      }
    })
    .state('login', {
      url: '/login',
      views: {
        'header' : {
          templateUrl: 'views/navbar.html',
          controller: 'NavController',
          controllerAs: 'vm'
        },
        'content' : {
          templateUrl: 'views/login.html',
          controller: 'AuthController',
          controllerAs: 'vm'
        },
      }
    })
    .state('game', {
      url: '/game',
      views: {
        'header' : {
          templateUrl: 'views/navbar.html',
          controller: 'NavController',
          controllerAs: 'vm'
        },
        'content' : {
          templateUrl: 'views/scorecard.html',
          controller: 'ScoreController',
          controllerAs: 'vm'
        },
      }
    })

}
