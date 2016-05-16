(function() {
    'use strict';

    angular
        .module('app.core')
        .run(appRun);

    /* @ngInject */
    function appRun($window, $rootScope, $q, $location, routerHelper, dataservice) {
        var otherwise = '/404';
        routerHelper.configureStates(getStates(), otherwise);

        var promises = [dataservice.getCommons(), dataservice.getStyles()];
        return $q.all(promises).then(function(data) {
            
            $rootScope.title = data[0].title;

            $rootScope.primaryFont = data[1].styleOptions.type.primaryFont;
            $rootScope.secondaryFont = data[1].styleOptions.type.secondaryFont
            $rootScope.style = 'body { font-family: "' + $rootScope.secondaryFont + '"; font-size: 1.8rem; }';
            $rootScope.style += 'h1,h2,h3,h4,h5,h6 { font-family: "' + $rootScope.primaryFont + '" }';

            // console.log( data[0].opengraph.image );
            $rootScope.opengraph = {
                'image': data[0].opengraph.image,
                'title': $rootScope.title,
                'url': $location.$$absUrl,
                'site_name': data[0].opengraph.site_name,
                'type': data[0].opengraph.type
            }
            
            var fonts = [];
            for(var i in data[1].styleOptions.type) 
            { 
                fonts.push(data[1].styleOptions.type[i]);
            }
            $window.WebFont.load({
                google: {
                  families: fonts
                },
                active: function() {}
            });
        });
    }

    function getStates() {
        return [
            {
                state: '404',
                config: {
                    url: '/404',
                    templateUrl: 'templates/404.html',
                    title: '404'
                }
            }
        ];
    }
})();