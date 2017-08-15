angular
  .module('group-proj')
  .factory('Group', Group);

Group.$inject = ['API', '$resource'];
function Group(API, $resource) {
  return $resource(`${API}/groups/:id`,
    {id: '@_id'},
    {'update': {method: 'PUT'}});
}
