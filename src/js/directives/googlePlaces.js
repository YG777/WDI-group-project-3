angular
.module('group-proj')
.directive('googlePlaces', googlePlaces);


googlePlaces.$inject = ['$window'];
function googlePlaces($window){
  const directive = {
    restrict: 'E',
    replace: true,
    template: '<div class="google-places">Google Places</div>',
    scope: {
      center: '='
    },
    link($scope, element) {
      new $window.google.maps.places.PlacesService(element[0]);
      console.log(element[0]);
      const place = new $window.google.places.Map(element[0], {
        center: $scope.center
      });

      new $window.google.places.Marker({
        position: $scope.center,
        place: place,
        animation: $window.google.places.Animation.DROP
      });
    }
  };

}
//
// [ '$parse', '$compile', '$timeout', '$document', 'googlePlacesApi',
// function ($parse, $compile, $timeout, $document, google) {
//
//   return {
//     restrict: 'A',
//     require: '^ngModel',
//     scope: {
//       model: '=ngModel',
//       options: '=?',
//       forceSelection: '=?',
//       customPlaces: '=?'
//     },
//     controller: ['$scope', function ($scope) {}],
//     link: function ($scope, element, attrs, controller) {
//       var keymap = {
//         tab: 9,
//         enter: 13,
//         esc: 27,
//         up: 38,
//         down: 40
//       },
//       hotkeys = [keymap.tab, keymap.enter, keymap.esc, keymap.up, keymap.down],
//       autocompleteService = new google.maps.places.AutocompleteService(),
//       placesService = new google.maps.places.PlacesService(element[0]);
//
//     }
//   }
