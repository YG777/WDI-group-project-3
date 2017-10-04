angular.module('group-proj')
  .controller('LandingPageCtrl', LandingPageCtrl);

LandingPageCtrl.$inject = ['$interval', '$rootScope'];
function LandingPageCtrl($interval, $rootScope) {
  const vm = this;
  vm.landingPage = true;
  vm.meals = ['Breakfast', 'Lunch', 'Dinner', 'the Pub', 'Bar crawls'];
  $rootScope.$broadcast('landingPage');
  vm.cycleMeals = cycleMeals;

  vm.meal = vm.meals[0];

  vm.cycleMeals();
  function cycleMeals() {
    let index = 0;
    $interval(() => {
      if (index === 4) index = 0;
      vm.meal = vm.meals[index];
      index++;
    }, 2000);
  }


}
