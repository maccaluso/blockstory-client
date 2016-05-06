(function () {
    'use strict';

    angular
        .module('app.bsfooter')
        .directive('bsfooter', function($q, $sce, dataservice){
            return {
                restrict: 'AEC',
		        template: '<footer ng-bind-html="footerHTML" ng-style="footerStyles"></footer>',
                replace: true,
		        link: function(scope, element, attrs){
                    
                    var promises = [dataservice.getFooter()];
                    return $q.all(promises).then(function(data) {
                        
                        scope.footerStyles = {
                            // height: data[0].footer.height,
                            'background-color': data[0].footer.background,
                            color: data[0].footer.text,
                            'padding-top': data[0].footer.paddingTop,
                            'padding-right': data[0].footer.paddingRight,
                            'padding-bottom': data[0].footer.paddingBottom,
                            'padding-left': data[0].footer.paddingLeft
                        };
                        scope.footerHTML = $sce.trustAsHtml( data[0].footer.HTMLContent );
                    });

		        }
            }
        })
})();