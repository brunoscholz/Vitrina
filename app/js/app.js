var app = angular.module('app', [
  'ngRoute',
  'gettext',
  'security',
  'vitrine',
  'profiles',
  'looks',
  'tags',
  'resources.users',
  'resources.profiles',
  'services.httpRequestTracker'
]);

/*angular.module('app', [
  'ngRoute',
  'projectsinfo',
  'dashboard',
  'projects',
  'admin',
  'services.breadcrumbs',
  'services.i18nNotifications',
  'services.httpRequestTracker',
  'security',
  'directives.crud',
  'templates.app',
  'templates.common']);*/

app.config(function ($routeProvider, $locationProvider, $httpProvider) {
  $locationProvider.html5Mode({enabled:true});
  //$routeProvider.otherwise({ redirectTo: '/vitrine' });
  $routeProvider
    .when('/login', {
      templateUrl:'profile/login.html',
      controller: 'LoginController'
    })
    .when('/forgot-password', {
      templateUrl:'profile/forgot_password.html',
      controller: 'LoginController'
    })
    .when('/signup', {
      templateUrl:'profile/signup.html',
      controller: 'LoginController'
    })
    .otherwise({ redirectTo: '/login' });

    var spinnerFunction = function (data, headers) {
        $('#intro-loader').show();
        return data;
    };
    $httpProvider.defaults.transformRequest.push(spinnerFunction);
});

app.run(function ($rootScope, security, languageService, gettextCatalog, User, Profile) {
  // Get the current user when the application starts
  // (in case they are still logged in from a previous session)
  security.requestCurrentUser(function (user) {
    console.log(user);
  });

/*  var credentials = { username: "bruno@oction.com.br", password: "Oeka8LIK" };
  User.checkUser(credentials, function (user) {
    var currentUser = user;
    Profile.forUser(user, function (profile) {
      currentUser.profile = profile;
      console.log(currentUser);
    });
  });*/

  console.log(sessionStorage);

  languageService();
  gettextCatalog.debug = true;
  //gettextCatalog.currentLanguage = 'pt_BR';

  /*$rootScope.searchQueryChanged = function(query) {
    $rootScope.searchQuery = query;
  };*/

  // adds some basic utilities to the $rootScope for debugging purposes
  $rootScope.log = function(thing) {
    console.log(thing);
  };

  $rootScope.alert = function(thing) {
    alert(thing);
  };
});

app.controller('LoginController', function ($scope, $location, security) {

  if(security.isAuthenticated()) {
    $location.path('/vitrine');
  }

  $scope.credentials = { username: "", password: "" };

  var onLoginSuccess = function(response) {
    $location.path('/vitrine');
  };

  $scope.login = function () {
    security.login($scope.credentials).success(onLoginSuccess);
  };

  $scope.forgot = function () {
    $location.path('/forgot-password');
  };

  $scope.register = function () {
    $location.path('/signup');
  };

});

app.controller('AppController', function ($scope, $http) {
  //$scope.notifications = i18nNotifications;
  $scope.notifications = [
    {
      type: 'error',
      message: 'dummy error!'
    },
    {
      type: 'success',
      message: 'success for nothing!!'
    }
  ];

  $http.get('http://vitrina.brazilsouth.cloudapp.azure.com:7000/api/dapps/11172989537083733196/api/messages/list?recipientId=9425224196345016949L').then(function (res) {
    console.log (res.data);
  });

  $scope.$on('$routeChangeError', function(event, current, previous, rejection){
    console.log('routeChangeError');
  });

});

app.controller('HeaderController',
  function ($scope, $location, $route, security, httpRequestTracker) {
    $scope.location = $location;
    //$scope.breadcrumbs = breadcrumbs;

    $scope.isAuthenticated = security.isAuthenticated;
    $scope.isAdmin = security.isAdmin;

    $scope.home = function () {
      if (security.isAuthenticated()) {
        $location.path('/vitrine');
      } else {
        $location.path('/login');
      }
    };

    $scope.profile = function () {
      $location.path('/profile');
    };

    $scope.isNavbarActive = function (navBarPath) {
      //return navBarPath === breadcrumbs.getFirst().name;
    };

    $scope.hasPendingRequests = function () {
      return httpRequestTracker.hasPendingRequests();
    };
});

app.value('version', '0.1');

app.constant('MONGOLAB_CONFIG', {
  dbName: 'vitrina_test',
  apiKey: 'biAYHuvywGGTtA1KuKxHhAREy2YSURoK' // Our MongoLab API key
});

app.constant('ACTION_REFERENCE', {
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

app.factory('promiseFactory', function($q) {
  return {
    decorate: function(promise) {
      promise.success = function(callback) {
        promise.then(callback);

        return promise;
      };

      promise.error = function(callback) {
        promise.then(null, callback);

        return promise;
      };
    },
    defer: function() {
      var deferred = $q.defer();

      this.decorate(deferred.promise);

      return deferred;
    }
  };
});
