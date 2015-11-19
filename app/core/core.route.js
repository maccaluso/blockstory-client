(function() {
    'use strict';

    angular
        .module('app.core')
        .run(appRun);

    /* @ngInject */
    function appRun($window, $rootScope, $q, routerHelper, dataservice) {
        var otherwise = '/404';
        routerHelper.configureStates(getStates(), otherwise);

        var promises = [dataservice.getStyles()];
        return $q.all(promises).then(function(data) {

            $rootScope.primaryFont = data[0].styleOptions.type.primaryFont;
            $rootScope.secondaryFont = data[0].styleOptions.type.secondaryFont
            $rootScope.style = 'body { font-family: "' + $rootScope.secondaryFont + '"; font-size: 1.8rem; }';
            $rootScope.style += 'h1,h2,h3,h4,h5,h6 { font-family: "' + $rootScope.primaryFont + '" }';
            
            var fonts = [];
            for(var i in data[0].styleOptions.type) 
            { 
                fonts.push(data[0].styleOptions.type[i]);
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