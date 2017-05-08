/**
 * Created by edianzu on 2017/4/27.
 */
app.config(['$stateProvider', '$urlRouterProvider' ,'$ionicConfigProvider',function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
  $ionicConfigProvider.backButton.text("返回");
  $ionicConfigProvider.backButton.previousTitleText(false);
  $ionicConfigProvider.platform.android.tabs.position('bottom');
  $ionicConfigProvider.platform.android.navBar.alignTitle('center');
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })

    // Each tab has its own nav history stack:

    .state('tab.film', {
      url: '/film',
      views: {
        'tab-film': {
          templateUrl: 'templates/tab-film.html',
          controller: 'FilmCtrl'
        }
      }
    })

    .state('tab.film-detail', {
      url: '/film-detail?id',
      views: {
        'tab-film': {
          templateUrl: 'templates/film-detail.html',
          controller: 'FilmDetailCtrl'
        }
      }
    })
    .state('tab.film-search',{
      url: '/film-search',
      views: {
        'tab-film': {
          templateUrl: 'templates/film-search.html',
          controller: 'FilmSearchCtrl'
        }
      }
    })
    .state('tab.cinema-search',{
      url: '/cinema-search',
      views: {
        'tab-cinema': {
          templateUrl: 'templates/cinema-search.html',
          controller: 'CinemaSearchCtrl'
        }
      }
    })

    .state('tab.cinema', {
      url: '/cinema',
      views: {
        'tab-cinema': {
          templateUrl: 'templates/tab-cinema.html',
          controller: 'CinemaCtrl'
        }
      }
    })


    .state('tab.film-list', {
      url: '/film-list?coming',
      views: {
        'tab-film': {
          templateUrl: 'templates/film-list.html',
          controller: 'FilmListCtrl'
        }
      }
    })

    .state('tab.mine', {
      url: '/mine',
      views: {
        'tab-mine': {
          templateUrl: 'templates/tab-mine.html',
          controller: 'MineCtrl'
        }
      }
    })
    //两个tab共用同一个页面可以这样定义
    .state('cinema-detail', {
      url: '/cinema-detail?cinemaId',
      templateUrl: 'templates/cinema-detail.html',
      controller: 'CinemaDetailCtrl'
    })
    .state('buy-ticket', {
      url: '/buy-ticket',
      templateUrl: 'templates/buy-ticket.html',
      controller: 'BuyTicketCtrl'
    })


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/film');

}]);
