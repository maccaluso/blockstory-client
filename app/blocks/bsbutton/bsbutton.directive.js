(function () {
    'use strict';

    angular
        .module('blocks.bsbutton')
        .directive('bsbutton', function($window){
            return {
                restrict: 'AEC',
		        templateUrl: 'templates/blocks/bsbutton/bsbutton.html',
                replace: true,
                scope: {
                    counter: '='
                },
		        link: function(scope, element, attrs){
                    var stickToTopStyles = {
                        position: 'fixed', 
                        top: 0, 
                        left: 0,
                        'z-index': 100
                    }
                    var stickToBottomStyles = {
                        position: 'fixed', 
                        bottom: 0, 
                        left: 0,
                        'z-index': 100
                    }
                    scope.opt = scope.$parent.rowCtrl.optionsT[scope.counter];

                    scope.switches = scope.$parent.rowCtrl.switchesT[scope.counter];
                    if( scope.switches.blockBtn ) { stickToTopStyles.width = stickToBottomStyles.width = '100%' }
                    
                    scope.radios = scope.$parent.rowCtrl.radiosT[scope.counter];
                    switch( scope.radios.stick.value )
                    {
                        case 'top':
                            scope.bsButtonPosition = stickToTopStyles;
                            break;
                        case 'bottom':
                            scope.bsButtonPosition = stickToBottomStyles;
                            break;
                        case 'none':
                            scope.bsButtonPosition = "{}";
                            break;
                    }
		        }
            }
        })
})();