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
  function ($scope, payload, $location, $http, $interval) {

    $scope.model = payload;

    $scope.parseJson = function(set) {
      return JSON.parse(set);
    };

    $scope.messages = [];
    $scope.msg = '';

    $scope.sendMessage = function () {
      var d = {
        "recipientId": "9425224196345016949L",
        "message": $scope.msg,
        "secret": "12345678"
      };

      $http.put('http://vitrina.brazilsouth.cloudapp.azure.com:7000/api/dapps/11172989537083733196/api/messages/add', d).success(function (res) {

        $http.get('http://vitrina.brazilsouth.cloudapp.azure.com:7000/api/dapps/11172989537083733196/api/messages/list?recipientId=9425224196345016949L').success(function (data) {
          console.log (data);
          //$scope.messages.push(data.response);
        });

      });
    };

    /*stop = $interval(function() {
      if ($scope.blood_1 > 0 && $scope.blood_2 > 0) {
        $scope.blood_1 = $scope.blood_1 - 3;
        $scope.blood_2 = $scope.blood_2 - 4;
      } else {
        $scope.stopFight();
      }
    }, 100);*/

    $scope.viewLook = function (look) {
      var lookId = look._id.$oid;
      console.log('/looks/' + lookId + '/view');
      $location.path('/looks/' + lookId + '/view');
    };
  }
);