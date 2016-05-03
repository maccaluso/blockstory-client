(function() {
    'use strict';

    angular
        .module('app.core')
        .constant('storyID', 'YOUR_STORY_ID_HERE')
        .constant('baseHref', '/')
        .constant('ENV', {
        	remote: true,
        	mode: 'production'
        })
})();
