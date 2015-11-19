(function () {
    'use strict';

    angular
        .module('blocks.imgresponsive')
        .directive('imgresponsive', function(){
		    return {
		        restrict: 'AEC',
		        template: '<div>' + 
		        		  	'<img class="img-responsive">' + 
		        		  	'<p class="img-caption"></p>' + 
		        		  '</div>',
		        replace: true,
		        scope: {
                    counter: '='
                },
		        link: function(scope, element, attrs){
		        	var options = scope.$parent.rowCtrl.optionsT[scope.counter];
		        	
		        	element.find('img').attr('src',options.imgUrl);
		        	element.find('p').html(options.caption);
		        }
		    }
		})
})();