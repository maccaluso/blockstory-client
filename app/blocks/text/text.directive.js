(function () {
    'use strict';

    angular
        .module('blocks.text')
        .directive('text', function($window){
            return {
                restrict: 'AEC',
		        template: '<p ng-bind-html="directiveText"></p>',
                replace: true,
                scope: {
                    counter: '='
                },
		        link: function(scope, element, attrs){
                    var opt = scope.$parent.rowCtrl.optionsT[scope.counter];
                    scope.directiveText = opt.txt;
		        }
            }
        })
})();
