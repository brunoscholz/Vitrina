angular.module('profiles', ['resources.profiles']);

angular.module('profiles').config(function ($routeProvider) {
  $routeProvider
    .when('/profile', {
      templateUrl:'profile/profile.html',
      controller:'ProfileController',
    });
});

angular.module('profiles').controller('ProfileController',
  function ($scope, $location, security) {
    if(security.isAuthenticated) {
      security.requestCurrentUser(function (data) {
        console.log(data);
      });
    }

    // $scope.name;
    // $scope.photo;
    // $scope.backPhoto;
    // $scope.work;
    // $scope.occupation;
    // $scope.aboutMe;
    // $scope.contact;
    // $scope.city; //region
    // $scope.birthday;
    // $scope.email; // show (?)

    // $scope.achievements; // link to big picture
    // $scope.vitrine; // feed - timeline
    // $scope.followers;
    // $scope.following;

    // $scope.profits; // wallet link


  });