angular
  .module('group-proj')
  .controller('GroupsIndexCtrl', GroupsIndexCtrl);

GroupsIndexCtrl.$inject = ['Group'];
function GroupsIndexCtrl(Group) {
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
      .delete({ id: group._id })
      .$promise
      .then(() => {
        groupDelete();
      });
  }
}
