angular.module('vitrine', ['resources.lookModel', 'security.authorization']);

angular.module('vitrine').config(
  function ($routeProvider, securityAuthorizationProvider) {
    $routeProvider
      .when('/vitrine', {
        templateUrl:'home.html',
        controller:'VitrineController',
        resolve:{
          payload: function (LookModel) {
            //TODO: need to know the current user here
            return LookModel.all();
          }
        },
        authenticatedUser: securityAuthorizationProvider.requireAuthenticatedUser
        //currentUser: securityAuthorizationProvider.requireAdminUser
      });
  }
);

angular.module('vitrine').controller('VitrineController', 
  function ($scope, payload, $location) {

    $scope.model = payload;

    $scope.parseJson = function(set) {
      return JSON.parse(set);
    };

    $scope.viewLook = function (look) {
      var lookId = look._id.$oid;
      console.log('/looks/' + lookId + '/view');
      $location.path('/looks/' + lookId + '/view');
    };
  }
);