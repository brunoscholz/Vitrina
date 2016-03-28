angular.module('listr', ['resources.profiles']);

angular.module('listr').config(function ($routeProvider) {
  $routeProvider
    .when('/listr', {
      templateUrl:'profile/profile.html',
      controller:'ListrController',
    });
});

angular.module('listr').controller('ListrController',
  function ($scope, $location, security) {
    if(security.isAuthenticated) {
      security.requestCurrentUser(function (data) {
        console.log(data);
      });
    }
  });