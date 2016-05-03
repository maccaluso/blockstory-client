(function() {
    'use strict';

    angular
        .module('app.core')
        .constant('storyID', 'YOUR_STORY_ID_HERExxx')
        .constant('baseHref', '/')
        .constant('ENV', {
        	remote: true,
        	mode: 'production'
        })
})();
