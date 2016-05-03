(function () {
    'use strict';
    
    angular
        .module('app.core')
        .factory('youtubeApiService', youtubeApiService);

    youtubeApiService.$inject = ['$q', '$window'];
    /* @ngInject */
    function youtubeApiService($q, $window) {

        var deferred = $q.defer();
        var apiReady = deferred.promise;

        $window.onYouTubeIframeAPIReady = function() {
            deferred.resolve();
        }

        // return {
        //     onReady: function(callback) {
        //         apiReady.then(callback);
        //     }
        // }
        
        var service = {
            onReady: function(callback) {
                apiReady.then(callback);
            }
        };

        return service;

        // function getStyles() {
            
        // }
    }
})();
