angular
.module('group-proj')
.controller('GroupsShowCtrl', GroupsShowCtrl);

GroupsShowCtrl.$inject = ['$stateParams', 'Group', '$rootScope'];
function GroupsShowCtrl($stateParams, Group, $rootScope){
  const vm = this;
  vm.show = show;
  vm.show();
  vm.newCount = {votes: 1};

  vm.upvote = function(suggestion){
    vm.group.suggestions[vm.group.suggestions.indexOf(suggestion)].votes++;
    Group.update({id: vm.group.id}, {suggestions: vm.group.suggestions});
  };

  function show() {
    vm.group = Group.get({id: $stateParams.id});


  }
  $rootScope.$on('suggestionAdded', () => vm.show());

}
