(function () {
    'use strict';

    angular
        .module('blocks.headline')
        .directive('headline', function($window,$rootScope,$location,$document){

            return {
                restrict: 'AEC',
                template: '<div class="headline-container">' + 
                            '<div class="headline-about-link">' + 
                                '<span class="headline-about-link-flag"></span>' +
                                '<div class="headline-about-content"></div>' + 
                            '</div>' + 
                            '<div class="headline-logo"></div>' + 
                            '<div class="headline-main-title col-md-12">' + 
                                '<h1 class="col-md-6 col-md-offset-3 col-xs-6 col-xs-offset-3"></h1>' + 
                                '<h4 class="col-md-6 col-md-offset-3 col-xs-6 col-xs-offset-3"></h4>' + 
                                '<div class="headline-sharing col-md-6 col-md-offset-3 col-xs-6 col-xs-offset-3">' + 
                                    '<a class="headline-share-link fb btn"></a>&nbsp;' +
                                    '<a class="headline-share-link tw btn"></a>' +
                                '</div>' + 
                                '<div class="headline-scroll-down col-md-6 col-md-offset-3 col-xs-6 col-xs-offset-3"></div>' + 
                            '</div>' +
                          '</div>',
                replace: true,
                scope: {
                    counter: '='
                },
                link: function(scope, element, attrs) {

                    var aboutLinkFlag = angular.element(element[0].children[0].children[0]);
                    var aboutLinkContent = angular.element(element[0].children[0].children[1]);
                    var logo = angular.element(element[0].children[1]);
                    var fb = angular.element(element[0].children[2].children[2].children[0]);
                    var tw = angular.element(element[0].children[2].children[2].children[1]);
                    var scrollDown = angular.element(element[0].children[2].children[3]);

                    var options = scope.$parent.rowCtrl.optionsT[scope.counter];
                    
                    element.parent()[0].style.padding = 0;

                    element.css({
                        height: $window.innerHeight + 'px',
                        backgroundImage: 'url(' + options.imgUrl + ')',
                    });

                    aboutLinkFlag.text(options.aboutLinkFlag).css({fontFamily: $rootScope.primaryFont});
                    aboutLinkContent.html(options.aboutContent).css({fontFamily: $rootScope.primaryFont});
                    logo.css({
                        width: options.logoWidth + 'px',
                        height: options.logoHeight + 'px',
                        backgroundImage: 'url(' + options.logoUrl + ')'
                    });

                    element.find('h1').html(options.title).css({fontFamily: $rootScope.primaryFont});
                    element.find('h4').html(options.subtitle).css({fontFamily: $rootScope.secondaryFont});
                    element.find('a').css({fontFamily: $rootScope.primaryFont}).attr('target','blank');

                    fb.attr('href','https://www.facebook.com/sharer/sharer.php?u=' + $location.$$absUrl);
                    tw.attr('href','http://twitter.com/share?url=' + $location.$$absUrl + '&text=Dalla%20Piazza%20Al%20Greto%20Del%20Fiume%20-%20Un%27Esperienza%20Di%20Narrazione%20Territoriale');

                    aboutLinkFlag.on('click',function(){ aboutLinkContent.toggleClass('visible') });
                    scrollDown.on('click',function(){ $document.scrollTop($window.innerHeight, 500); })

                    $window.onresize = function(e){
                        element.css({ height: $window.innerHeight + 'px' })
                    }
                }
            }
        })
})();
