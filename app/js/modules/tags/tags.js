angular.module('tags', ['ngTagsInput', 'resources.tags']);

angular.module('tags').config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/tags', {
      templateUrl:'tag/tags-list.html',
      controller:'TagController',
      resolve:{
        payload: function (TagModel) {
          return TagModel.all();
        }
        // user settings, filters, etc..
      }
    });
}]);

angular.module('tags').controller('TagController', ['$scope', 'payload', '$location', function($scope, payload, $location){
  //$scope.tags = {};
  $scope.rawtags = payload;
  $scope.selectedTags = [];

  //$scope.testQuery = TagModel.getParent('79');
  //$scope.testQuery = TagsModel.forItem('56de2393e4b0aa178cd55ceb');
  //console.log(tags.getById('56de2393e4b0aa178cd55ceb'));

  console.log(payload[2]);
  payload[2].getChildren(function (data) {
    $scope.testQuery = data;
    console.log($scope.testQuery);
  });

  $scope.loadTags = function(query) {
    console.log(query);
    var nodes = _.filter($scope.rawtags, function(x){ return x.name.toLowerCase().indexOf(query.toLowerCase()) > -1; });

    var ret = [];
    for(var n in nodes) {
      ret.push({text: nodes[n].name});
    }
    console.log(nodes);
    return ret;
  };

}]);

angular.module('tags').directive("tags", ['$compile', function ($compile) {
      var fn = $compile;

      function compile(tElement, tAttr) {
        var contents = tElement.contents().remove();
        var compiledContents;
        return function(scope, iElement, iAttr) {
          if(!compiledContents) {
            compiledContents = fn(contents);
          }

          compiledContents(scope, function(clone, scope) {
            iElement.append(clone); 
          });
        };
      }

      return {
        compile: compile,
        restrict: "E",
        scope: {
          category: '=',
          //query: '=' | filter:query
        },
        template: '<p ng-if="category.childCount > 0" id="tag{{ category.id }}">{{ category.name }}</p>'+
                  '<p ng-if="category.childCount == 0" draggable item="{{category.name}}" id="tag{{ category.id }}" style="color:#00f;"><b>{{ category.name }}</b></p>'+
                  '<ul>' + 
                      '<li ng-repeat="child in category.children">' + 
                          '<tags class="tag" category="child"></tags>' +
                      '</li>' +
                  '</ul>',
      };   
}]);

angular.module('tags').directive('typeahead', function() {
    return {
        restrict: 'E',
        transclude: true,
        replace: true,
        template: '<div><form><input ng-model="term" ng-change="query()" type="text" autocomplete="off" /></form><div ng-transclude></div></div>',
        scope: {
            search: "&",
            select: "&",
            items: "=",
            term: "="
        },
        controller: ["$scope", function($scope) {
            $scope.items = [];
            $scope.hide = false;

            this.activate = function(item) {
                $scope.active = item;
            };

            this.activateNextItem = function() {
                var index = $scope.items.indexOf($scope.active);
                this.activate($scope.items[(index + 1) % $scope.items.length]);
            };

            this.activatePreviousItem = function() {
                var index = $scope.items.indexOf($scope.active);
                this.activate($scope.items[index === 0 ? $scope.items.length - 1 : index - 1]);
            };

            this.isActive = function(item) {
                return $scope.active === item;
            };

            this.selectActive = function() {
                this.select($scope.active);
            };

            this.select = function(item) {
                $scope.hide = true;
                $scope.focused = true;
                $scope.select({item:item});
            };

            $scope.isVisible = function() {
                return !$scope.hide && ($scope.focused || $scope.mousedOver);
            };

            $scope.query = function() {
                $scope.hide = false;
                $scope.search({term:$scope.term});
            };
        }],

        link: function(scope, element, attrs, controller) {

            var $input = element.find('form > input');
            var $list = element.find('> div');

            /*
            $input.bind('blur', function()
            $list.bind('mouseover', function()
            $list.bind('mouseleave', function()
            $input.bind('focus', function()
                scope.$apply(function() { scope.focused = true; });
                scope.$apply(function() { scope.focused = false; });
                scope.$apply(function() { scope.mousedOver = true; });
                scope.$apply(function() { scope.mousedOver = false; });
            */

            $input.bind('keyup', function(e) {
                if (e.keyCode === 9 || e.keyCode === 13) {
                    scope.$apply(function() { controller.selectActive(); });
                }

                if (e.keyCode === 27) {
                    scope.$apply(function() { scope.hide = true; });
                }
            });

            $input.bind('keydown', function(e) {
                if (e.keyCode === 9 || e.keyCode === 13 || e.keyCode === 27) {
                    e.preventDefault();
                }

                if (e.keyCode === 40) {
                    e.preventDefault();
                    scope.$apply(function() { controller.activateNextItem(); });
                }

                if (e.keyCode === 38) {
                    e.preventDefault();
                    scope.$apply(function() { controller.activatePreviousItem(); });
                }
            });


            scope.$watch('items', function(items) {
                controller.activate(items.length ? items[0] : null);
            });

            scope.$watch('focused', function(focused) {
                if (focused) {
                    //$timeout(function() { $input.focus(); }, 0, false);
                }
            });

            scope.$watch('isVisible()', function(visible) {
                if (visible) {
                    var pos = $input.position();
                    var height = $input[0].offsetHeight;

                    $list.css({
                        top: pos.top + height,
                        left: pos.left,
                        position: 'absolute',
                        display: 'block'
                    });
                } else {
                    $list.css('display', 'none');
                }
            });
        }
    };
});

angular.module('tags').directive('typeaheadItem', function() {
    return {
        require: '^typeahead',
        link: function(scope, element, attrs, controller) {

            var item = scope.$eval(attrs.typeaheadItem);

            scope.$watch(function() { return controller.isActive(item); }, function(active) {
                if (active) {
                    element.addClass('active');
                } else {
                    element.removeClass('active');
                }
            });

            element.bind('mouseenter', function(e) {
                scope.$apply(function() { controller.activate(item); });
            });

            element.bind('click', function(e) {
                scope.$apply(function() { controller.select(item); });
            });
        }
    };
});