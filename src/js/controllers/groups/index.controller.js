angular
  .module('group-proj')
  .controller('GroupsIndexCtrl', GroupsIndexCtrl);

GroupsIndexCtrl.$inject = ['API', 'Group' ];
function GroupsIndexCtrl(API, Group ) {
  const vm = this;
  vm.all = [];
  vm.index = index;
  vm.delete = groupDelete;

  vm.index();
  function index() {
    Group.query(data => {
      vm.all = data;
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
