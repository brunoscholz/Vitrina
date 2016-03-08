var look = angular.module('app.Look', [
    'ActiveRecord',
    'LookTimeline'
]);

(function (BaseController) {
  var vm = null;

  function LookController($scope, payload, action, $route, $location, $filter, $http, DateModel) {
    BaseController.call(this, $scope);
    vm = this;

    $scope.editingFile = false;

    // only necessary when creating...
    $scope.dropzoneConfig = {
        'options': {
            // passed into the Dropzone constructor
            'url': 'upload.php',
            'uploadMultiple': false,
            'autoProcessQueue': false,
            'acceptedFiles' : 'image/*',
            init: function() {
                this.on("addedfile", function(file) {
                    $scope.editingFile = true;
                    vm.readFile(file);
                });

                $scope.dropzoneObj = this;
                $scope.clearFiles = function() {
                    // Using "_this" here, because "this" doesn't point to the dropzone anymore
                    $scope.dropzoneObj.removeAllFiles();
                    $scope.editingFile = false;
                    // If you want to cancel uploads as well, you
                    // could also call _this.removeAllFiles(true);
                };
            }
        },
        'eventHandlers': {
            
        }
    };

    $scope.look = {
        id: null,
        caption: 'Untitled',
        pic: '',
        tags: []
    };

    var phfilters = [
        { displayName: 'normal', name: 'normal', image: 'img/filters/normal.jpg', description: '' },
        { displayName: 'vintage', name: 'vintage', image: 'img/filters/vintage.jpg', description: '' },
        { displayName: 'lomo', name: 'lomo', image: 'img/filters/lomo.jpg', description: '' },
        { displayName: 'clarity', name: 'clarity', image: 'img/filters/clarity.jpg', description: '' },
        { displayName: 'sinCity', name: 'sinCity', image: 'img/filters/sinCity.jpg', description: '' },
        { displayName: 'sunrise', name: 'sunrise', image: 'img/filters/sunrise.jpg', description: '' },
        { displayName: 'crossProcess', name: 'crossProcess', image: 'img/filters/crossProcess.jpg', description: '' },
        { displayName: 'orangePeel', name: 'orangePeel', image: 'img/filters/orangePeel.jpg', description: '' },
        { displayName: 'love', name: 'love', image: 'img/filters/love.jpg', description: '' },
        { displayName: 'grungy', name: 'grungy', image: 'img/filters/grungy.jpg', description: '' },
        { displayName: 'jarques', name: 'jarques', image: 'img/filters/jarques.jpg', description: '' },
        { displayName: 'pinhole', name: 'pinhole', image: 'img/filters/pinhole.jpg', description: '' },
        { displayName: 'oldBoot', name: 'oldBoot', image: 'img/filters/oldBoot.jpg', description: '' },
        { displayName: 'glowingSun', name: 'glowingSun', image: 'img/filters/glowingSun.jpg', description: '' },
        { displayName: 'hazyDays', name: 'hazyDays', image: 'img/filters/hazyDays.jpg', description: '' },
        { displayName: 'herMajesty', name: 'herMajesty', image: 'img/filters/herMajesty.jpg', description: '' },
        { displayName: 'nostalgia', name: 'nostalgia', image: 'img/filters/nostalgia.jpg', description: '' },
        { displayName: 'hemingway', name: 'hemingway', image: 'img/filters/hemingway.jpg', description: '' },
        { displayName: 'concentrate', name: 'concentrate', image: 'img/filters/concentrate.jpg', description: '' }
    ];

    // possibly aditional filters to buy and aquired or made by users 
    $scope.photoFilters = phfilters;

    $scope.rawpicture = {};//{ url: '', width: 0, height: 0 };
    $scope.picFile = {};
    $scope.model = $scope.filteredData = payload;

		var onLogoutSuccess = function(response) {
			$location.path('/login');
		};

		$scope.logout = function() {
			AuthenticationService.logout().success(onLogoutSuccess);
		};
  }

  LookController.prototype.parseJson = function(set) {
    return JSON.parse(set);
  };

  LookController.prototype = Object.create(BaseController);

  LookController.prototype.onDispose = function () {
  	console.log("LookController.dtor");
  	BaseController.prototype.onDispose.call(this);
  };

	look.controller("LookController", ['$scope', 'payload', 'action', '$route', '$location', '$filter', '$http', 'DateModel', LookController]);
})(Luxore.BaseController);

/*angular.module('app.Look').factory('LookModel', ['mongolabResource', function ($mongolabResource) {

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
}]);*/

angular.module('app.Look').factory('TagModel', ['mongolabResource', function ($mongolabResource) {

  var Tags = $mongolabResource('tag');

  /*Tags.forPhoto = function(lookId, successcb, errorcb) {
    //TODO: get projects for this user only (!)
    return Looks.query({}, successcb, errorcb);
  };*/

  /*Tags.prototype.getParent = function (tagId) {
    var p = this.parent;
    
    for(var t in tags) {
      allTags.push(tags[t]);
    }
    
    return allTags;
  };*/

  return Tags;
}]);

angular.module('app.Look').factory('DateModel', ['mongolabResource', function ($mongolabResource) {

  var DateDim = $mongolabResource('date');

  /*Tags.forPhoto = function(lookId, successcb, errorcb) {
    //TODO: get projects for this user only (!)
    return Looks.query({}, successcb, errorcb);
  };*/

  /*Tags.prototype.getParent = function (tagId) {
    var p = this.parent;
    
    for(var t in tags) {
      allTags.push(tags[t]);
    }
    
    return allTags;
  };

    $http.get('/tags.json').success(function(data) {
      for(var t in data) {
        console.log(data[t].name);
         var tag = new DateModel();
          tag.dateId = data[t].dateId;
          tag.year = data[t].year;
          tag.month = data[t].month;
          tag.monthName = data[t].monthName;
          tag.day = data[t].day;
          tag.dayName = data[t].dayName;
          tag.date = data[t].date;
          tag.dateName = data[t].dateName;
          tag.dayInYear = data[t].dayInYear;
         tag.$saveOrUpdate(changeSuccess, changeSuccess, changeError, changeError);
      }
    });

  */

  return DateDim;
}]);