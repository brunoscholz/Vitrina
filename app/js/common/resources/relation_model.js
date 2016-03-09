angular.module('resources.relationship', ['mongolabResource']);
angular.module('resources.relationship').factory('Relationship', ['mongolabResource', function ($mongolabResource) {
  var Reference = $mongolabResource('reference_transaction');
    
  Reference.forPhoto = function(lookId, successcb, errorcb) {
    //TODO: get projects for this user only (!)
    return Reference.query({}, successcb, errorcb);
  };

  Reference.prototype.getTags = function (lookId) {
    var allTags = [];

    var tags = this.tags.split(',');
    for(var t in tags) {
      allTags.push(tags[t]);
    }

    return allTags;
  };

  return Reference;
}]);