(function () {
    'use strict';
    
    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$http', '$q', '$filter', 'storyID', 'ENV'];
    /* @ngInject */
    function dataservice($http, $q, $filter, storyID, ENV) {

        var basePath;
        ENV.remote ? basePath = 'http://5.101.98.193:3000/api/stories/' : basePath = 'http://localhost:3000/api/stories/';
        
        var service = {
            getCommons: getCommons,
            getStyles: getStyles,
            getStory: getStory
        };

        return service;

        function getCommons() {
            var commonsEndpoint = basePath + storyID + '?filter[fields][styleOptions]=false&filter[fields][layout]=false';

            return $http.get(commonsEndpoint)
                .then(getCommonsComplete)
                .catch(getCommonsFailed);

            function getCommonsComplete(response) {
                return response.data;
            }
            function getCommonsFailed(error) {
                console.log('XHR Failed for getQuestions.' + error.data);
            }
        }

        function getStyles() {
            var stylesEndpoint = basePath + storyID + '?filter[fields][styleOptions]=true';

            return $http.get(stylesEndpoint)
                .then(getStylesComplete)
                .catch(getStylesFailed);

            function getStylesComplete(response) {
                return response.data;
            }
            function getStylesFailed(error) {
                console.log('XHR Failed for getQuestions.' + error.data);
            }
        }

        function getStory() {
            var storyEndpoint = basePath + storyID + '?filter[fields][layout]=true&filter[order]=rowOrder%20DESC';
            
            return $http.get(storyEndpoint)
                .then(getStoryComplete)
                .catch(getStoryFailed);

            function getStoryComplete(response) {
                return response.data;
            }
            function getStoryFailed(error) {
                console.log('XHR Failed for getQuestions.' + error.data);
            }
        }
    }
})();
