angular.module('security.interceptor', ['security.retryQueue'])
  .config(function ($httpProvider) {
  $httpProvider.interceptors.push(function ($location, $q, $injector, securityRetryQueue, SessionService, FlashService) {
    return {
      request: function (config) {
        // console.log(config); // Contains the data about the request before it is sent.
        if (!SessionService.isAnonymous) {
          config.headers['x-session-token'] = SessionService.token;
        }
        // Return the config or wrap it in a promise if blank.
        return config || $q.when(config);
      },
      requestError: function (rejection) {
        // console.log(rejection); // Contains the data about the error on the request.
        // Return the promise rejection.
        return $q.reject(rejection);
      },
      response: function (response) {
        if(response.data.flash) {
          FlashService.show(response.data.flash);
        }
        return response || $q.when(response);
      },
      responseError: function (response) {
        if(response.data.error) {
          FlashService.show(response.data.error.message);
        }

        if(response.status === 403) {
          // anauthenticated
          SessionService.unset('authenticated');
          $location.path('/login');
        }

        if(response.status === 401) {
          // unauthorized
          return securityRetryQueue.pushRetryFn('unauthorized-server', function retryRequest() {
            return $injector.get('$http')(response.config);
          });
        }

        if(response.status === 419) {
          // session expired
          var deferred = $q.defer();

          // create a new session
          SessionService.login().then(deferred.resolve, deferred.reject);

          return deferred.promise.then(function () {
            return $injector.get('$http')(response.config);
          });
        }

        return $q.reject(response);
      }
    };
  });
});
