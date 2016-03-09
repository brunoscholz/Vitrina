angular.module('resources.profiles', ['mongolabResource']);
angular.module('resources.profiles').factory('Profile', ['mongolabResource', function ($mongolabResource) {
  var Reference = $mongolabResource('profile');

  return Reference;
}]);