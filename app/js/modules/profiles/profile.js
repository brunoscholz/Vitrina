angular.module('profiles', ['resources.profiles']);

angular.module('profiles').config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/profile', {
      templateUrl:'user/profile.html',
      controller:'ProfileController',
      resolve:{
        payload: function (Profile) {
          // only currentUser.id profile
          return Profile.all();
        }
        // user settings, filters, etc..
      }
    });
}]);

angular.module('profiles').controller('ProfileController', ['$scope', 'payload', '$location',
  function ($scope, payload, $location) {

  }]);