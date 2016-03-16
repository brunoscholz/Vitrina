angular.module('resources.users', ['mongolabResource', 'resources.profiles']);
angular.module('resources.users').factory('User', function (mongolabResource, promiseFactory, Profile) {
  var user = mongolabResource('user');

  user.checkUser = function (credentials) {
    var deferred = promiseFactory.defer();

    user.query({email:credentials.username, password:credentials.password}, {fields: {password: 0}})
      .then(function (res) {
        currentUser = res[0];
        if(currentUser !== null && typeof currentUser === 'object') {
          return deferred.resolve(res);
        } else {
          console.log('user empty');
          return deferred.reject({error:'user not found'});
        }
      }, function(err) {
        return deferred.reject(err);
      });

    return deferred.promise;
  };

  user.userProfile = function (userId) {
    //return Profile.forUser();
  };

  return user;
});