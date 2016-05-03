(function() {
    'use strict';

    angular
        .module('app.core')
        .constant('storyID', 'YOUR STORY ID HERE')
        .constant('baseHref', '/')
        .constant('ENV', {
        	remote: true,
        	mode: 'production'
        })
})();
