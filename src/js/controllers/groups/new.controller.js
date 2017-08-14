angular.module('group-proj')
.controller('GroupNewCtrl', GroupNewCtrl);

GroupNewCtrl.$inject = ['Group', '$state', 'CurrentUserService'];
function GroupNewCtrl(Group, $state, CurrentUserService) {
  const vm = this;
  vm.group = {members: []};
  vm.new = groupsNew;

  vm.group.members.push(CurrentUserService.currentUser.id);
  function groupsNew() {
    Group.save(vm.group)
      .$promise
      .then($state.go('groupsIndex'));
  }


}
