angular
  .module('group-proj')
  .config(Router);

Router.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];
function Router($stateProvider, $locationProvider, $urlRouterProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
  .state('landingPage', {
    url: '/',
    templateUrl: '/js/views/landingpage.html',
    controller: 'LandingPageCtrl',
    controllerAs: 'landingPage'
  })
  .state('register', {
    url: '/register',
    templateUrl: '/js/views/register.html',
    controller: 'RegisterCtrl',
    controllerAs: 'register'
  })
  .state('login', {
    url: '/login',
    templateUrl: '/js/views/login.html',
    controller: 'LoginCtrl',
    controllerAs: 'login'
  })
  .state('usersIndex', {
    url: '/users',
    templateUrl: '/js/views/users/index.html',
    controller: 'UsersIndexCtrl',
    controllerAs: 'usersIndex'
  })
  .state('groupsIndex', {
    url: '/groups',
    templateUrl: '/js/views/groups/index.html',
    controller: 'GroupsIndexCtrl',
    controllerAs: 'groups'
  })
  .state('groupsNew', {
    url: '/groups/new',
    templateUrl: '/js/views/groups/new.html',
    controller: 'GroupsNewCtrl',
    controllerAs: 'groups'
  })
  .state('groupsShow', {
    url: '/groups/:id',
    templateUrl: '/js/views/groups/show.html',
    controller: 'GroupsShowCtrl',
    controllerAs: 'groups'
  })
  .state('groupsEdit', {
    url: '/groups/:id/edit',
    templateUrl: '/js/views/groups/edit.html',
    controller: 'GroupsEditCtrl',
    controllerAs: 'groups'
  });

  $urlRouterProvider.otherwise('/');
}
