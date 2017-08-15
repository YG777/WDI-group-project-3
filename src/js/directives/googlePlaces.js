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
      console.log(element[0]);

      var placeSearch, autocomplete;
      var componentForm = {
        street_number: 'short_name',
        route: 'long_name',
        locality: 'long_name',
        administrative_area_level_1: 'short_name',
        country: 'long_name',
        postal_code: 'short_name'
      };

      autocomplete = new $window.google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */element[0],
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
            const groupSuggestions = group.suggestions;

            groupSuggestions.push(newSuggestion);
            const toUpdateData = {suggestions: groupSuggestions};
            Group.update({id: $stateParams.id}, toUpdateData);
            $rootScope.$broadcast('suggestionAdded');
          });
      }
    }

  };
  return directive;
}
