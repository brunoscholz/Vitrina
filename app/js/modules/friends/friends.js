angular.module('friends', ['resources.friends']);

angular.module('friends').config(function ($routeProvider) {
  $routeProvider
    .when('/friends', {
      templateUrl:'profile/friends.html',
      controller:'FriendsController',
    });
});

angular.module('friends').controller('FriendsController',
  function ($scope, $location, security) {
    if(security.isAuthenticated) {
      security.requestCurrentUser(function (data) {
        console.log(data);
      });
    }
  });