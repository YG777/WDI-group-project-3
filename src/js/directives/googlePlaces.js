angular
.module('group-proj')
.directive('googlePlaces', googlePlaces);

googlePlaces.$inject = ['$window'];
function googlePlaces($window) {
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

        // autocomplete.addListener('place_changed', fillInAddress);
    }


    // Create the autocomplete object, restricting the search to geographical
    // location types.

  };
  return directive;
}
