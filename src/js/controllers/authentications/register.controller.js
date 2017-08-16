angular
.module('group-proj')
.controller('RegisterCtrl', RegisterCtrl);

RegisterCtrl.$inject = ['User', 'CurrentUserService', '$state', '$rootScope'];
function RegisterCtrl(User, CurrentUserService, $state, $rootScope){
  const vm = this;
  $rootScope.$broadcast('inApp');
  vm.register = ()=> {
    User
      .register(vm.user)
      .$promise
      .then(() => {
        CurrentUserService.getUser();
        $state.go('groupsIndex');
      }, err => {
        console.log(err);
      });
  };
}
