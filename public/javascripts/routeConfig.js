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
          templateUrl: 'views/game.html',
          controller: 'ScoreController',
          controllerAs: 'vm'
        },
      }
    })
    .state('game.table', {
      url: '/table',
      views: {
        'table@game' : {
          templateUrl: 'views/table.html',
          controller: 'ScoreController',
          controllerAs: 'vm'
        },
      }
    })
    .state('game.scorecard', {
      url: '/scorecard',
      views: {
        'table@game' : {
          templateUrl: 'views/scorecard.html',
          controller: 'ScoreController',
          controllerAs: 'vm'
        },
      }
    })
    .state('game.stats', {
      url: '/stats',
      views: {
        'stats@game' : {
          templateUrl: 'views/stats.html',
          controller: 'ScoreController',
          controllerAs: 'vm'
        },
      }
    })

}
