angular
.module('group-proj')
.directive('googlePlaces', googlePlaces);

googlePlaces.$inject = ['$window', 'Group', '$stateParams', '$rootScope'];
function googlePlaces($window, Group, $stateParams, $rootScope) {
  const directive = {
    restrict: 'E',
    replace: true,
    template: '<input type="text" id="google-places" />',
    scope: {
      center: '='
    },
    link($scope, element) {
      var autocomplete = new $window.google.maps.places.Autocomplete(
            element[0],
            {types: ['establishment']});

      autocomplete.addListener('place_changed', addSuggestion);

      function addSuggestion() {
        const place = autocomplete.getPlace();
        let address = '';
        place.address_components.forEach(component => {
          address += `${component.short_name} `;
        });
        const newSuggestion = {
          name: place.name,
          votes: 1,
          address
        };
        Group.get({id: $stateParams.id})
          .$promise
          .then(group => {
            group.suggestions.push(newSuggestion);
            const toUpdateData = {suggestions: group.suggestions};
            Group.update({id: $stateParams.id}, toUpdateData);
            $rootScope.$broadcast('suggestionAdded');
          });
      }
    }

  };
  return directive;
}
