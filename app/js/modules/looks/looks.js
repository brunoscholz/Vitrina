angular.module('looks', ['resources.lookModel']);

angular.module('looks').config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/looks/:id/view', {
        templateUrl:'look/view.html',
        controller:'LookController',
        resolve:{
          payload: function($route, LookModel) {
            //console.log($route);
            return LookModel.getById($route.current.params.id);
          },
          authenticatedUser: function() {
            return {id: 1, name: 'bruno', admin: 1};
          }
          // user settings, filters, etc..
        }
      })
      .when('/looks/new', {
        templateUrl:'look/form.html',
        controller:'LookController',
        resolve:{
          payload: ['LookModel', function (LookModel) {
            //TODO: need to know the current user here
            return new LookModel();
          }],
          authenticatedUser: function() {
            return {id: 1, name: 'bruno', admin: 1};
          }
          // user settings, filters, etc..
        }
      });
  }]);

angular.module('looks').controller('LookController', ['$scope', 'payload', 'authenticatedUser', function($scope, payload, authenticatedUser){
  $scope.model = payload;
  
  $scope.parseJson = function(set) {
    return JSON.parse(set);
  };
}]);