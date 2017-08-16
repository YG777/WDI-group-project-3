angular.module('group-proj')
  .controller('GroupsEditCtrl', GroupsEditCtrl);

GroupsEditCtrl.$inject = ['Group', '$state', '$stateParams'];
function GroupsEditCtrl(Group, $state, $stateParams) {
  const vm = this;
  vm.fullGroupData = Group.get({ id: $stateParams.id }, data => {
    vm.group = {
      name: data.name,
      organization: data.organization
    };
  });

  vm.update = groupsUpdate;

  function groupsUpdate() {
    Group.update({ id: $stateParams.id }, vm.group)
      .$promise
      .then(group => {
        $state.go('groupsShow', { id: group.id });
      });
  }

}
