angular
.module('group-proj')
.controller('GroupsShowCtrl', GroupsShowCtrl);

GroupsShowCtrl.$inject = ['$stateParams', 'Group', 'MessageThread', '$rootScope', 'CurrentUserService'];
function GroupsShowCtrl($stateParams, Group, MessageThread, $rootScope, CurrentUserService){
  const vm = this;
  vm.currentUserName = CurrentUserService.currentUser.name;
  vm.currentUserId = CurrentUserService.currentUser.id;
  vm.show = show;
  vm.upvote = upvote;
  vm.updateSuggestions = updateSuggestions;
  vm.postMessage = postMessage;
  vm.newMessage = {user: vm.currentUserId};



  vm.show();

  function upvote(suggestion) {
    const index = vm.group.suggestions.indexOf(suggestion);
    if (suggestion.userVotes.indexOf(vm.currentUserId) < 0) {
      vm.group.suggestions[index].votes++;
      vm.group.suggestions[index].userVotes.push(vm.currentUserId);
      Group.update({id: vm.group.id}, {suggestions: vm.group.suggestions})
      .$promise
      .then(() => {
        vm.updateSuggestions();
      });
    } else {
      vm.group.suggestions[index].votes--;
      vm.group.suggestions[index].userVotes.splice(suggestion.userVotes.indexOf(vm.currentUserId),1);
      Group.update({id: vm.group.id}, {suggestions: vm.group.suggestions})
      .$promise
      .then(() => {
        vm.updateSuggestions();
      });
    }
  }



  function show() {
    Group.get({id: $stateParams.id}, group => {
      group.suggestions.sort((a, b) => {
        return b.votes - a.votes;
      });
      vm.group = group;
    });

    vm.messages = MessageThread.get({id: $stateParams.id});
  }

  scrollbottom();

  function scrollbottom() {
    const messageThread = document.getElementById('message-thread');
    messageThread.scrollTop = messageThread.scrollHeight;
  }

  function updateSuggestions() {
    Group.get({ id: $stateParams.id })
    .$promise
    .then(group => {
      group.suggestions.sort((a, b) => {
        return b.votes - a.votes;
      });
      vm.group.suggestions = group.suggestions;
    });
  }

  function postMessage() {
    MessageThread.get({id: $stateParams.id})
    .$promise
    .then(messageThread => {
      messageThread.messages.push(vm.newMessage);
      MessageThread.update({id: messageThread.id}, vm.newMessage)
      .$promise
      .then(() => {
        vm.newMessage.user = {name: vm.currentUserName, id: vm.currentUserId};
        vm.messages.messages.push(vm.newMessage);
        vm.newMessage = {user: vm.currentUserId};
      });
    });
  }


  $rootScope.$on('suggestionAdded', () => vm.updateSuggestions());


}
