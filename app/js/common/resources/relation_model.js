angular.module('resources.relationship', ['mongolabResource']);
angular.module('resources.relationship').factory('Relationship', ['mongolabResource', function ($mongolabResource) {
  var Reference = $mongolabResource('reference_transaction');
    
  

  return Reference;
}]);