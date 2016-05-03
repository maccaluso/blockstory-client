(function () {
    'use strict';

    angular
        .module('blocks.soundcloud')
        .directive('soundcloud', function($sce){
		    return {
		        restrict: 'AEC',
		        templateUrl: 'templates/blocks/soundcloud/soundcloud.html',
		        replace: true,
		        scope: {
                    counter: '='
                },
		        link: function(scope, element, attrs){
		        	scope.opt = scope.$parent.rowCtrl.optionsT[scope.counter];

		        	var scBaseUrl = 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/';
		        	var scParamsUrl = '&amp;auto_play=false&amp;hide_related=true&amp;show_comments=false&amp;show_user=true&amp;show_reposts=false&amp;visual=true'

		        	scope.audioUrl = $sce.trustAsResourceUrl( scBaseUrl + scope.opt.audioID + scParamsUrl );
		        }
		    }
		})
})();