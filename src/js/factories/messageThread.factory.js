angular.module('group-proj')
.factory('MessageThread', MessageThread);

MessageThread.$inject = ['API', '$resource'];
function MessageThread(API, $resource) {
  return $resource(`${API}/messages/:id`, {id: '@_id'},
    {'update': {method: 'PUT'}
    });
}
