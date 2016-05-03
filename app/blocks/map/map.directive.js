(function () {
	'use strict';

	angular
	.module('blocks.map')
	.directive('map', function($sce,$http){
		return {
			restrict: 'E',
				// template: '<ui-gmap-google-map center="map.center" zoom="map.zoom" options="mapOptions">' + 
				// 			'<ui-gmap-markers ' + 
				// 				'models="markers" ' + 
				// 				'coords="\'self\'" ' + 
				// 				'icon="\'icon\'" ' + 
				// 			'></ui-gmap-markers>' +
				// 		  '</ui-gmap-google-map>' + 
				// 		  '<p class="map-caption" ng-bind-html="caption"></p>',
				templateUrl: 'templates/blocks/map/map.html',
				scope: {
					counter: '='
				},
				controller: function(){
					
				},
				link: function(scope, element, attrs){

					var options = scope.$parent.rowCtrl.optionsT[scope.counter];
					var collections = scope.$parent.rowCtrl.collectionsT[scope.counter];
					var switches = scope.$parent.rowCtrl.switchesT[0]

					scope.mapOptions = { scrollwheel: false };
					scope.markerOptions = { icon: options.markerIconUrl };

					scope.caption = $sce.trustAsHtml( options.caption );

					scope.showRoute = switches.showRoute || false;
					scope.routeStroke = {
						color: options.routeColor,
						weight: options.routeWeight
					}

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

					if( switches.showRoute ) {
						var numMarkers = scope.markers.length;

						var routingEndpoint = 'https://maps.googleapis.com/maps/api/directions/json?';
						var routeOriginString = 'origin=' + scope.markers[0].latitude + ',' + scope.markers[0].longitude;
						var routeDestinationString = '&destination=' + scope.markers[numMarkers-1].latitude + ',' + scope.markers[numMarkers-1].longitude;
						var routeWaypoints = '';
						if( numMarkers > 2 )
						{
							routeWaypoints += '&waypoints=';
							for(var i=1; i<scope.markers.length-1; i++) {
								if( i > 1 ) { routeWaypoints += '|'; }
								routeWaypoints += scope.markers[i].latitude;
								routeWaypoints += ','
								routeWaypoints += scope.markers[i].longitude;
							}
						}
						
						var routingKey = '&key=AIzaSyBbZhrsG4LL36hl7io7HtKlO9O0tNdbpK8';

						var reqString = routingEndpoint + routeOriginString + routeDestinationString + routeWaypoints + routingKey;

						$http({
							method: 'GET', 
							url: reqString,
							headers: {
								'Content-Type': 'application/json; charset=utf-8',
							}
						}).then(function (result) {
							
							scope.steps = [];

							var points = result.data.routes[0].legs;
							for (var i = points.length - 1; i >= 0; i--) {
								for(var j = points[i].steps.length -1; j >= 0; j-- )
								{
									var tempEnd = {};
									tempEnd.latitude = points[i].steps[j].end_location.lat;
									tempEnd.longitude = points[i].steps[j].end_location.lng;
									scope.steps.push( tempEnd );
								}
							}
						}, function (result) {
							console.log("Error: No data returned");
						});
					}

					$(element).find('.angular-google-map-container').css({height: options.containerHeight});
				}
			}
		})
})();