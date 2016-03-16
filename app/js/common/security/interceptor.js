angular.module('security.interceptor', ['security.retryQueue'])
  .config(function ($httpProvider) {
  $httpProvider.interceptors.push(function ($location, $q, $injector, securityRetryQueue, SessionService, FlashService) {
    return {
      request: function (config) {
        // console.log(config); // Contains the data about the request before it is sent.
        if (!SessionService.isAnonymous) {
          config.headers['x-session-token'] = SessionService.token;
        }
        //console.log(config);
        // Return the config or wrap it in a promise if blank.
        $('#intro-loader').delay(200).fadeOut();
        return config || $q.when(config);
      },
      requestError: function (rejection) {
        // console.log(rejection); // Contains the data about the error on the request.
        // Return the promise rejection.
        $('#intro-loader').delay(200).fadeOut();
        return $q.reject(rejection);
      },
      response: function (response) {
        if(response.data.flash) {
          console.log(response.data.flash);
          FlashService.show(response.data.flash);
        }
        $('#intro-loader').delay(200).fadeOut();
        return response || $q.when(response);
      },
      responseError: function (response) {
        $('#intro-loader').delay(200).fadeOut();
        if(response.data.error) {
          console.log(response.data.error.message);
          FlashService.show(response.data.error.message);
        }

        if(response.status === 403) {
          // anauthenticated
          SessionService.unset('authenticated');
          console.log('authenticated');
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
      },
    };
  });
});
