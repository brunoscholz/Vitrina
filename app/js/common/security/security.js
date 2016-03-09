// Based loosely around work by Witold Szczerba - https://github.com/witoldsz/angular-http-auth
angular.module('security.service', ["ngSanitize", 'resources.profiles']);

angular.module('security.service').factory('security', function ($http, $sanitize, SessionService, FlashService, $location, Profile) {

  var cacheSession   = function() {
    SessionService.set('authenticated', true);
  };

  var uncacheSession = function() {
    SessionService.unset('authenticated');
  };

  var sanitizeCredentials = function(credentials) {
    return {
      username: $sanitize(credentials.username),
      password: $sanitize(credentials.password)
    };
  };

  // The public API of the service
  var service = {
    login: function (credentials) {
      var login = $http.post("/auth/login", sanitizeCredentials(credentials));
      login.success(cacheSession);
      login.success(FlashService.clear);
      return login;
    },
    logout: function (redirectTo) {
      var logout = $http.get("/auth/logout");
      logout.success(uncacheSession);
      service.currentUser = null;
      redirect(redirectTo);
      return logout;
    },

    currentUser: null,

    requestCurrentUser: function (cb) {
      //console.log(sessionStorage);
      if ( service.isAuthenticated() ) {
        //return $q.when(service.currentUser);
        Profile.query({userId:1}).then(function (data) {
          service.currentUser = data;
          cb(service.currentUser);
        });
      }
      /*else {
        return $http.get('/current-user').then(function(response) {
          service.currentUser = response.data.user;
          return service.currentUser;
        });
      }*/
    },

    isAuthenticated: function () {
      return SessionService.get('authenticated');
    },
    isAdmin: function () {
      if(service.currentUser) {
        return service.currentUser.admin;
      }
    }
  };

  return service;
});

angular.module('security.service').factory("SessionService", function () {
  return {
    get: function (key) {
      return sessionStorage.getItem(key);
    },
    set: function (key, val) {
      return sessionStorage.setItem(key, val);
    },
    unset: function (key) {
      return sessionStorage.removeItem(key);
    }
  };
});

angular.module('security.service').factory("FlashService", function ($rootScope) {
  return {
    show: function (message) {
      $rootScope.flash = message;
    },
    clear: function() {
      $rootScope.flash = "";
    }
  };
});

angular.module('security.service').config(function ($httpProvider) {
  $httpProvider.interceptors.push(function ($location, $q, SessionService, FlashService) {
    return {
      response: function (response) {
        if(response.data.flash) {
          FlashService.show(response.data.flash);
        }
        return response;
      },
      responseError: function (response) {
        if(response.data.error) {
          FlashService.show(response.data.error.message);
        }

        if(response.status === 403) {
          SessionService.unset('authenticated');
          $location.path('/login');
        }

        return $q.reject(response);
      }
    };
  });
});