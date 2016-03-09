angular.module('resources.lookModel', ['mongolabResource']);
angular.module('resources.lookModel').factory('LookModel', ['mongolabResource', function ($mongolabResource) {
  var Looks = $mongolabResource('look');
    
  Looks.forPhoto = function(lookId, successcb, errorcb) {
    //TODO: get projects for this user only (!)
    return Looks.query({}, successcb, errorcb);
  };

  Looks.prototype.getTags = function (lookId) {
    var allTags = [];

    var tags = this.tags.split(',');
    for(var t in tags) {
      allTags.push(tags[t]);
    }

    return allTags;
  };

  return Looks;
}]);