(function () {
    'use strict';

    angular
        .module('blocks.imgresponsive')
        .directive('imgresponsive', function($sce){
		    return {
		        restrict: 'AEC',
		        template: '<div>' + 
		        		  	'<img class="img-responsive" ng-src="{{ opt.imgUrl }}">' + 
		        		  	'<p class="img-caption" ng-bind-html="opt.caption"></p>' + 
		        		  '</div>',
		        replace: true,
		        scope: {
                    counter: '='
                },
		        link: function(scope, element, attrs){
		        	scope.opt = scope.$parent.rowCtrl.optionsT[scope.counter];
		        	scope.opt.caption = $sce.trustAsHtml( scope.opt.caption );
		        }
		    }
		})
})();