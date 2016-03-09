angular.module('vitrine', ['resources.lookModel']);

angular.module('vitrine').config(['$routeProvider', function($routeProvider){
  
  $routeProvider
    .when('/vitrine', {
      templateUrl:'home.html',
      controller:'VitrineController',
      resolve:{
        payload: ['LookModel', function (looks) {
          //TODO: need to know the current user here
          return looks.all();
        }]
        // user settings, filters, etc..
      }
    });
}]);

angular.module('vitrine').controller('VitrineController', ['$scope', 'payload', '$location', function($scope, payload, $location){
  $scope.model = payload;

  $scope.parseJson = function(set) {
    return JSON.parse(set);
  };

  $scope.viewLook = function (look) {
    var lookId = look._id.$oid;
    console.log('/looks/' + lookId + '/view');
    $location.path('/looks/' + lookId + '/view');
  };

}]);