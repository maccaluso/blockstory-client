(function () {
    'use strict';

    angular
        .module('blocks.videoembed')
        .directive('videoembed', function($window){
            return {
                restrict: 'E',
                template: '<div></div>',
                replace: true,
                scope: {
                    counter: '='
                },
                link: function(scope, element, attrs){
                    var options = scope.$parent.rowCtrl.optionsT[scope.counter];
                    switch(options.videoHost)
                    {
                        case 'youtube':
                            var tag = document.createElement('script');
                            tag.src = "https://www.youtube.com/iframe_api";
                            var firstScriptTag = document.getElementsByTagName('script')[0];
                            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

                            var player;

                            $window.onYouTubeIframeAPIReady = function() {
                                player = new YT.Player(element[0], {
                                    playerVars: {
                                        autoplay: 0,
                                        html5: 1,
                                        theme: "light",
                                        modesbranding: 1,
                                        color: "white",
                                        iv_load_policy: 3,
                                        showinfo: 0,
                                        controls: 1,
                                    },
                                    width: '100%',
                                    videoId: options.videoID,
                                });
                            }
                            break;
                        case 'vimeo':
                            break;
                    }
                }
            }
        })
})();
