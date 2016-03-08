var Luxore = angular.module("app", [
  "ngResource",
  "ngRoute",
  'mongolabResource',
  "app.Look"
]);

Luxore.run(function($rootScope) {
  // adds some basic utilities to the $rootScope for debugging purposes
  $rootScope.log = function(thing) {
    console.log(thing);
  };

  $rootScope.alert = function(thing) {
    alert(thing);
  };
});

Luxore.controller('AppController', ['$scope',
  function($scope) {
  //$scope.notifications = i18nNotifications;
}])

.controller('HeaderController', ['$scope',
  function ($scope) {

  $scope.home = function () {

  };
}]);

Luxore.constant('MONGOLAB_CONFIG', {
  dbName: 'vitrina_test',
  apiKey: 'biAYHuvywGGTtA1KuKxHhAREy2YSURoK' // Our MongoLab API key
});

Luxore.constant('ACTION_REFERENCE', {
  'crud.create':'1',
  'crud.remove':'2',
  'crud.update':'3',
  'crud.delete':'4',
  'content.like':'5',
  'content.dislike':'6',
  'content.share':'7',
  'content.tip':'8',
  'social.invite':'9',
  'social.view':'10',
  'social.follow':'11',
  'social.unfollow':'12',
  'social.accept':'13',
  'social.decline':'14',
  'interact.addcomment':'15',
  'interact.removecomment':'16',
  'interact.addTag':'17',
  'interact.removeTag':'18',
  'interact.addToList':'19',
  'interact.removeFromList':'20',
  'interact.analyse':'21',
  'financial.buy':'22',
  'financial.sell':'23',
  'financial.pay':'24',
  'financial.deliver':'25',
  'financial.invest':'26',
  'financial.propose':'27',
  'path.achieve':'28'
});

Luxore.value('version', '0.1');

Luxore.BaseController = (function () {

    function BaseController($scope) {
        var me = this;

        me.$scope = $scope;

        me.$scope.$on("$destroy", function () {
            me.onDispose();
        });
    }

    BaseController.prototype.onDispose = function () {
        var me = this;

        console.log(me.name + ".dtor");
    };

    return BaseController;
}) ();