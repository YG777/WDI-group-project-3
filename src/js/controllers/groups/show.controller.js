angular
.module('group-proj')
.controller('GroupShowCtrl', GroupShowCtrl);

GroupShowCtrl.$inject = ['API', '$stateParams', 'Group'];
function GroupShowCtrl(API, $stateParams, Group){
  const vm = this;
  vm.group = Group.get({id: $stateParams.id});
  // return vm.todos[$stateParams.id];
}
