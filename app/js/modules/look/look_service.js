(function (BaseController) {
  var vm = null;
  var _http;
  var _resource;

	function LookService($scope, $http) {
    BaseController.call(this, $scope);
    vm = this;
    vm._http = $http;
    //vm._resource = mongolabResource;
  }

  LookService.prototype.getFeed = function(callback) {
    /*return vm._http.get('../../mocks/feed.json').success(function(data) {
        callback(data);
    });*/
  };

  LookService.prototype.AddTags = function(callback) {
    vm._http.get('tags.json').success(function(data) {
      callback(data);
    });
  };

	angular.module('app.Look').service("LookService", ['$scope', '$http', LookService]);

})(Luxore.BaseController);

/*angular.module('app.Look').factory('Relationships', ['mongolabResource', function ($mongolabResource) {

  var Relationships = $mongolabResource('relationship');

  Relationships.forUser = function(userId, successcb, errorcb) {
    //TODO: get projects for this user only (!)
    return Relationships.query({}, successcb, errorcb);
  };

  Relationships.prototype.isProductOwner = function (userId) {
    return this.productOwner === userId;
  };
  Relationships.prototype.canActAsProductOwner = function (userId) {
    return !this.isScrumMaster(userId) && !this.isDevTeamMember(userId);
  };
  Relationships.prototype.isScrumMaster = function (userId) {
    return this.scrumMaster === userId;
  };
  Relationships.prototype.canActAsScrumMaster = function (userId) {
    return !this.isProductOwner(userId);
  };
  Relationships.prototype.isDevTeamMember = function (userId) {
    return this.teamMembers.indexOf(userId) >= 0;
  };
  Relationships.prototype.canActAsDevTeamMember = function (userId) {
    return !this.isProductOwner(userId);
  };

  Relationships.prototype.getRoles = function (userId) {
    var roles = [];
    if (this.isProductOwner(userId)) {
      roles.push('PO');
    } else {
      if (this.isScrumMaster(userId)){
        roles.push('SM');
      }
      if (this.isDevTeamMember(userId)){
        roles.push('DEV');
      }
    }
    return roles;
  };

  return Relationships;
}]);*/