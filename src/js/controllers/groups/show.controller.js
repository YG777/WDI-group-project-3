angular
.module('group-proj')
.controller('GroupsShowCtrl', GroupsShowCtrl);

GroupsShowCtrl.$inject = ['$stateParams', 'Group', '$rootScope'];
function GroupsShowCtrl($stateParams, Group, $rootScope){
  const vm = this;
  vm.show = show;
  vm.show();

  function show() {
    vm.group = Group.get({id: $stateParams.id});
  }
  $rootScope.$on('suggestionAdded', () => vm.show());


  // return vm.todos[$stateParams.id];
}
