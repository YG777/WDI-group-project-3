angular
  .module('group-proj')
  .controller('GroupsIndexCtrl', GroupsIndexCtrl);

GroupsIndexCtrl.$inject = ['Group', 'User', 'CurrentUserService'];
function GroupsIndexCtrl( Group, User, CurrentUserService) {
  const vm = this;
  vm.all = [];
  vm.currentUser = User.get({ id: CurrentUserService.currentUser.id }, user => {
    vm.currentUserGroups = { groups: user.groups };
  });
  vm.index = index;
  vm.delete = groupDelete;
  vm.joinGroup = joinGroup;

  vm.index();
  function index() {
    Group.query(data => {
      vm.all = data;
    });
  }

  function joinGroup(groupId) {
    User.get({ id: CurrentUserService.currentUser.id })
    .$promise
    .then(user => {
      vm.groupsId = [];
      vm.currentUser = user;
      user.groups.forEach(group => {
        vm.groupsId.push(group.id);
      });
      vm.currentUserGroups = { groups: vm.groupsId };
      vm.membersId = [];
      Group.get({ id: groupId }, group => {
        group.members.forEach(member => {
          vm.membersId.push(member.id);
        });
        const toPushGroup = {members: vm.membersId};
        if (toPushGroup.members.indexOf(vm.currentUser.id) >= 0) return console.log('Cant join a group twice');
        toPushGroup.members.push(vm.currentUser.id);
        Group.update({ id: group.id }, toPushGroup);
      })
      .$promise
      .then(() => {
        if (vm.currentUserGroups.groups.indexOf(groupId) >= 0) return console.log('Cant join a group twice');
        vm.currentUserGroups.groups.push(groupId);
        User.update({ id: vm.currentUser.id }, vm.currentUserGroups);
      });
    });
  }

  function groupDelete(group) {
    Group
      .delete({ id: group.id })
      .$promise
      .then(() => {
        vm.index();
      });
  }
}
