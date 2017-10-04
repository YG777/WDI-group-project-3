angular
  .module('group-proj')
  .controller('GroupsIndexCtrl', GroupsIndexCtrl);

GroupsIndexCtrl.$inject = ['Group', 'User', 'CurrentUserService'];
function GroupsIndexCtrl( Group, User, CurrentUserService) {
  const vm = this;
  vm.all = [];
  vm.index = index;
  vm.delete = groupDelete;
  vm.joinGroup = joinGroup;



  function index() {
    Group.query(data => {
      vm.all.forEach(group => {
        group.suggestions.sort((a, b) => {
          return b.votes - a.votes;
        });
      });
      vm.all = data;
    });
  }

  function joinGroup(groupId) {
    User.get({ id: CurrentUserService.currentUser.id })
    .$promise
    .then(user => {
      vm.currentUser = user;
      vm.groupsId = [];
      user.groups.forEach(group => {
        vm.groupsId.push(group.id);
      });
      vm.currentUserGroups = { groups: vm.groupsId };
      vm.membersId = [];
      Group.get({ id: groupId }, group => {
        group.members.forEach(member => {
          vm.membersId.push(member.id);
        });
        vm.currentGroupMembers = { members: vm.membersId };
        if (vm.currentGroupMembers.members.indexOf(vm.currentUser.id) >= 0) return console.log('Cant join a group twice');
        vm.currentGroupMembers.members.push(vm.currentUser.id);
        Group.update({ id: group.id }, vm.currentGroupMembers);
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
  vm.index();
}
