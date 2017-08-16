angular.module('group-proj')
  .controller('LandingPageCtrl', LandingPageCtrl);

LandingPageCtrl.$inject = ['$window', '$rootScope'];
function LandingPageCtrl($window, $rootScope) {
  const vm = this;
  vm.landingPage = true;
  vm.meals = ['Breakfast', 'Lunch', 'Dinner', 'the Pub', 'Bar crawls'];
  vm.meal = vm.meals[3];
  $rootScope.$broadcast('landingPage');
  // vm.cycleMeals = cycleMeals;
  //
  // vm.cycleMeals();
  //
  //
  // function cycleMeals() {
  //   let index = 0;
  //   setInterval(() => {
  //     console.log('running', index, vm.meal);
  //     if (index === 4) index = 0;
  //     vm.meal = vm.meals[index];
  //      index++;
  //   }, 500);
  // }

  // vm.meal = 'MEAL 1';
  // $window.setTimeout(() => {
  //   vm.meal = 'MEAL 2';
  // }, 1000);

}
