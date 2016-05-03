/* global toastr:false, moment:false */
(function() {
    'use strict';

    angular
        .module('app.core')
        .constant('storyID', '56241f8e2ff172ce01732d04')
        // .constant('storyID', '55c7e454c54d2d0e9601f821')
        .constant('baseHref', '/')
        .constant('ENV', {
        	remote: false,
        	mode: 'dev'
        })
})();
