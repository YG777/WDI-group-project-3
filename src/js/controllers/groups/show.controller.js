angular
.module('group-proj')
.controller('GroupsShowCtrl', GroupsShowCtrl);

GroupsShowCtrl.$inject = ['API', '$stateParams', 'Group'];
function GroupsShowCtrl(API, $stateParams, Group){
  const vm = this;
  vm.group = Group.get({id: $stateParams.id});
  // return vm.todos[$stateParams.id];
}
