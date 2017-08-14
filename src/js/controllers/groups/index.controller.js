angular
  .module('group-proj')
  .controller('GroupsIndexCtrl', GroupsIndexCtrl);

GroupsIndexCtrl.$inject = ['Group'];
function GroupsIndexCtrl(Group) {
  const vm = this;
  vm.all = [];
  vm.index = index;

  vm.index();
  function index() {
    Group.query(data => {
      vm.all = data;
    });
  }
}
