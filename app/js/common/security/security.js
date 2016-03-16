// vitrina.brazilsouth.cloudapp.azure.com
// http://104.41.62.84/vitrina

// Based loosely around work by Witold Szczerba - https://github.com/witoldsz/angular-http-auth
angular.module('security.service', [
  "ngSanitize", 
  'resources.profiles',
  'security.retryQueue',    // Keeps track of failed requests that need to be retried once the user logs in
  'security.login',         // Contains the login form template and controller
  'resources.profiles',
  'resources.users'
]);

angular.module('security.service').factory('security',
  function ($http, $q, $sanitize, SessionService, FlashService, $location, securityRetryQueue, Profile, User) {

    // Redirect to the given url (defaults to '/')
    function redirect(url) {
      url = url || '/';
      $location.path(url);
    }

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

    currentUser = {};

    // Register a handler for when an item is added to the retry queue
    securityRetryQueue.onItemAddedCallbacks.push(function(retryItem) {
      if ( securityRetryQueue.hasMore() ) {
        //service.showLogin();
        redirect('/login');
      }
    });

    // The public API of the service
    var service = {

      // Get the first reason for needing a login
      getLoginReason: function() {
        return securityRetryQueue.retryReason();
      },

      /*login: function (credentials) {
        var login = $http.post("/auth/login", sanitizeCredentials(credentials));
        login.success(cacheSession);
        login.success(FlashService.clear);
        return login;
      },*/

      login: function (credentials) {
        //var login = User.checkUser(sanitizeCredentials(credentials));
          return User.checkUser(sanitizeCredentials(credentials)).success(function (data) {
            cacheSession();
            FlashService.clear();
            currentUser = data[0];
            SessionService.create(currentUser);
            console.log(currentUser);
          });
      },

      logout: function (redirectTo) {
        return $http.get("/expire-my-session").success(function (data) {
          uncacheSession();
          currentUser = null;
          redirect(redirectTo);
        });
      },

      requestCurrentUser: function (cb) {
        //console.log(sessionStorage);
        if ( service.isAuthenticated() ) {
          cb( SessionService.currentUser() );          
        }
        /*else {
          return $http.get('/current-user').then(function(response) {
            service.currentUser = response.data.user;
            return service.currentUser;
          });
        }*/
      },

      showLogin: function () {
        console.log('showLogin');
      },

      isAuthenticated: function () {
        return SessionService.get('authenticated');
      },
      isAdmin: function () {
        if(currentUser) {
          return currentUser.admin;
        }
      }
    };

    return service;
  });

angular.module('security.service').factory("SessionService", function () {
  var currentUser = null;

  return {
    create: function (userData) {
      currentUser = userData;
      return sessionStorage.setItem('currentUser', userData);
    },

    destroy: function ( ) {
      currentUser = null;
      return sessionStorage.removeItem('currentUser');
    },

    currentUser: function () {

      if(currentUser !== null) {
        return currentUser;
      }

      var s = sessionStorage.getItem('currentUser');
      if(s !== null) {
        return s;
      }

      return null;
    },

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

angular.module('security.service').run(function ($rootScope, $location, $http, security, FlashService) {
  var routesThatRequireAuth = ['/vitrine', '/profile'];

  $rootScope.$on('$locationChangeStart', function(event, next, current) {
    if(_(routesThatRequireAuth).contains($location.path()) && !security.isAuthenticated()) {
      $location.path('/login');
      FlashService.show("Please log in to continue.");
    }
  });

  $rootScope.isLoggedOut = function() {
    return !security.isAuthenticated();
  };

  $rootScope.expireMySession = function() {
    $http.get('/expire-my-session');
  };
});