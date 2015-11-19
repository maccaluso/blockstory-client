(function () {
    'use strict';

    angular
        .module('blocks.map')
        .directive('map', function(){
		    return {
		        restrict: 'AEC',
		        template: '<ui-gmap-google-map center="map.center" zoom="map.zoom" options="mapOptions">' + 
		        			'<ui-gmap-markers ' + 
		        				'models="markers" ' + 
		        				'coords="\'self\'" ' + 
		        				'icon="\'icon\'" ' + 
		        			'></ui-gmap-markers>' +
		        		  '</ui-gmap-google-map>',
		        scope: {
                    counter: '='
                },
		        link: function(scope, element, attrs){
		        	scope.mapOptions = { scrollwheel: false };
		        	var options = scope.$parent.rowCtrl.optionsT[scope.counter];
		        	var collections = scope.$parent.rowCtrl.collectionsT[scope.counter];

		        	scope.map = { 
		        		center: { 
		        			latitude: parseFloat(options.centerLat), 
		        			longitude: parseFloat(options.centerLng) 
		        		}, 
		        		zoom: parseInt(options.zoom)
		        	};
		        	scope.markers = [];

		        	for(var i=0; i<collections.markers.length; i++) {
		        		scope.markers.push(collections.markers[i]);
		        	}

		        	var mapContainer = element[0].children[0].children[0].children[0];
        			angular.element(mapContainer).css({height: '300px'});
		        }
		    }
		})
})();