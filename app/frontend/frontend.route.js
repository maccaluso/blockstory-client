(function() {
    'use strict';

    angular
        .module('app.frontend')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'frontend',
                config: {
                    url: '/',
                    templateUrl: 'templates/frontend.html',
                    controller: 'FrontendController',
                    controllerAs: 'vm',
                    title: ''
                }
            }
        ];
    }
})();
