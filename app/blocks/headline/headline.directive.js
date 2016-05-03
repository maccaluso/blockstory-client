(function () {
    'use strict';

    angular
        .module('blocks.headline')
        .directive('headline', function($window,$rootScope,$location,$document,$timeout){

            return {
                restrict: 'AEC',
                templateUrl: 'templates/blocks/headline/headline.html',
                replace: true,
                scope: {
                    counter: '='
                },
                link: function(scope, element, attrs) {

                    var aboutLinkFlag = $(element).find('.headline-about-link-flag');
                    var aboutLinkContent = $(element).find('.headline-about-content');
                    var logo = $(element).find('.headline-logo');
                    var fb = $(element).find('.fb');
                    var tw = $(element).find('.tw');
                    var scrollDownLink = $(element).find('.headline-scroll-down');
                    var innerTitle = $(element).find('.headline-main-title-inner');

                    var options = scope.$parent.rowCtrl.optionsT[scope.counter];
                    scope.options = options;
                    
                    element.parent()[0].style.padding = 0;
                    element.css({
                        height: $window.innerHeight + 'px',
                        backgroundImage: 'url(' + options.imgUrl + ')',
                    });

                    // layout
                    $timeout(function(){

                        aboutLinkFlag.css({fontFamily: $rootScope.primaryFont});
                        aboutLinkContent.css({fontFamily: $rootScope.primaryFont});
                        logo.css({
                            width: options.logoWidth + 'px',
                            height: options.logoHeight + 'px',
                            backgroundImage: 'url(' + options.logoUrl + ')'
                        });

                        element.find('h1').css({fontFamily: $rootScope.primaryFont});
                        element.find('h4').css({fontFamily: $rootScope.secondaryFont});
                        element.find('a').css({fontFamily: $rootScope.primaryFont}).attr('target','blank');

                        fb.attr('href','https://www.facebook.com/sharer/sharer.php?u=' + $location.$$absUrl);
                        tw.attr('href','http://twitter.com/share?url=' + $location.$$absUrl);

                        innerTitle
                        .css({ marginTop: '-' + innerTitle.height()/2 + 'px' })
                        .addClass('show');

                    }, false);

                    // events
                    aboutLinkFlag.on('click', function(e){ aboutLinkContent.toggleClass('visible'); });
                    scrollDownLink.on('click', function(e){ $document.scrollTop($window.innerHeight, 500); });
                    $window.onresize = function(e){
                        element.css({ height: $window.innerHeight + 'px' });
                        innerTitle.css({ marginTop: '-' + innerTitle.height()/2 + 'px' });
                    }
                }
            }
        })
})();
