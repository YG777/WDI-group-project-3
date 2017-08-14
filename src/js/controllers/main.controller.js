angular
.module('group-proj')
.controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$state', '$rootScope', 'CurrentUserService']
function MainCtrl ($state, $rootScope, CurrentUserService) {
  const vm = this;

  vm.logout = logout;

  $rootScope.$on('loggedIn',() =>{
    vm.user = CurrentUserService.currentUser;
  });
  $rootScope.$on('loggedOut', ()=>{
    vm.user = null;
    $state.go('login');
  });
  function logout(){
    CurrentUserService.removeUser();
  }
}
