var looktm = angular.module('LookTimeline', []);// Source: src/timeline-badge-directive.js

looktm.directive('timelineCard', function() {
  return {
    restrict: 'E',
    transclude: true,
    template: '<div class="mdl-card mdl-shadow--4dp" ng-transclude></div>',
  };
});

looktm.directive('timelineMedia', function() {
  return {
    require: '^timelineCard',
    restrict: 'E',
    transclude: true,
    template: '<div class="mdl-card__media mdl-color-text--grey-50" ng-transclude></div>'
  };
});

looktm.directive('timelineTags', function() {
  return {
    require: '^timelineCard',
    restrict: 'E',
    transclude: true,
    template: '<div class="mdl-card__supporting-text mdl-color-text--grey-600" ng-transclude></div>'
  };
});

looktm.directive('timelineMeta', function() {
  return {
    require: '^timelineCard',
    restrict: 'E',
    transclude: true,
    template: '<div class="mdl-card__supporting-text meta mdl-color-text--grey-600" ng-transclude></div>'
  };
});
