angular.module('group-proj')
  .controller('GroupsNewCtrl', GroupsNewCtrl);

GroupsNewCtrl.$inject = ['Group', '$state', 'CurrentUserService'];
function GroupsNewCtrl(Group, $state, CurrentUserService) {
  const vm = this;
  const currentUserId = CurrentUserService.currentUser.id;
  vm.group = {admin: currentUserId ,members: []};
  vm.new = groupsNew;

  vm.group.members.push(currentUserId);
  function groupsNew() {
    Group.save(vm.group)
      .$promise
      .then($state.go('groupsIndex'));
  }
}
