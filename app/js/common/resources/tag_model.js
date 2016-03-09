angular.module('resources.tags', ['mongolabResource']);
angular.module('resources.tags').factory('TagModel', ['mongolabResource', function ($mongolabResource) {
  
  var tags = $mongolabResource('tag');

  tags.forItem = function (tagId) {
    return tags.query({id:tagId});
  };

  tags.forParent = function (tagId) {
    return tags.query({parent:tagId});
  };

  tags.prototype.getChildren = function (callback) {
    var parent = tags.query({parent:this.id}).then(function (p) {
      callback(p);
    });
  };

  tags.prototype.getParent = function (callback) {
    if(this.parent) {
      var parent = tags.query({id:this.parent}).then(function (p) {
        callback(p[0]);
      });
    } else {
      callback({});
    }
  };

  return tags;
}]);