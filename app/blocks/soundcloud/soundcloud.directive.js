(function () {
    'use strict';

    angular
        .module('blocks.soundcloud')
        .directive('soundcloud', function(){
		    return {
		        restrict: 'AEC',
		        template: '<div>' + 
		        		  	'<iframe width="100%" height="115" scrolling="yes" frameborder="no"></iframe>' + 
		        		  	'<p>{{options.caption}}</p>' + 
		        		  '</div>',
		        replace: true,
		        scope: {
                    counter: '='
                },
		        link: function(scope, element, attrs){
		        	var options = scope.$parent.rowCtrl.optionsT[scope.counter];

		        	var scBaseUrl = 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/';
		        	var scParamsUrl = '&amp;color=222&amp;auto_play=false&amp;hide_related=true&amp;show_comments=true&amp;show_user=false&amp;show_reposts=false';

		        	var audioUrl = scBaseUrl + options.audioID + scParamsUrl;

		        	element.find('iframe').attr('src',audioUrl);
		        	element.find('p').html(options.caption);
		        }
		    }
		})
})();