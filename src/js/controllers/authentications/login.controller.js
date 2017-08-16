angular
  .module('group-proj')
  .controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = ['User', 'CurrentUserService', '$state', '$rootScope'];
function LoginCtrl(User, CurrentUserService, $state, $rootScope) {
  const vm = this;
  $rootScope.$broadcast('inApp');
  vm.login = () => {
    User.login(vm.user)
      .$promise
      .then(() => {
        CurrentUserService.getUser();
        $state.go('groupsIndex');
      }, err => {
        console.log(err);
      });
  };
}
