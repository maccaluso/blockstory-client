(function () {
    'use strict';

    angular
        .module('blocks.text')
        .directive('text', function($window){
            return {
                restrict: 'AEC',
		        template: '<p></p>',
                scope: {
                    counter: '='
                },
		        link: function(scope, element, attrs){
                    var options = scope.$parent.rowCtrl.optionsT[scope.counter];
		            element.html(options.txt);
		        }
            }
        })
})();
