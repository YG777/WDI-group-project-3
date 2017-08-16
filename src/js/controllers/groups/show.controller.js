angular
.module('group-proj')
.controller('GroupsShowCtrl', GroupsShowCtrl);

GroupsShowCtrl.$inject = ['$stateParams', 'Group', 'MessageThread', '$rootScope', 'CurrentUserService'];
function GroupsShowCtrl($stateParams, Group, MessageThread, $rootScope, CurrentUserService){
  const vm = this;
  vm.currentUserId = CurrentUserService.currentUser.id;
  vm.show = show;
  vm.postMessage = postMessage;
  vm.newMessage = {user: vm.currentUserId};
  vm.show();
  vm.newCount = {votes: 1};

  vm.upvote = function(suggestion){
    vm.group.suggestions[vm.group.suggestions.indexOf(suggestion)].votes++;
    Group.update({id: vm.group.id}, {suggestions: vm.group.suggestions});
  };

  function show() {
    vm.group = Group.get({id: $stateParams.id});
    vm.messages = MessageThread.get({id: $stateParams.id});
  }
  $rootScope.$on('suggestionAdded', () => vm.show());

  function postMessage() {
    MessageThread.get({id: $stateParams.id})
      .$promise
      .then(messageThread => {
        messageThread.messages.push(vm.newMessage);
        MessageThread.update({id: messageThread.id}, vm.newMessage)
        .$promise
        .then(() => {
          vm.messages.messages.push(vm.newMessage);
          vm.newMessage = {user: vm.currentUserId};
        });
      });
  }

  // return vm.todos[$stateParams.id];
}
