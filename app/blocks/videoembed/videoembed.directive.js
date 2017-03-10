(function () {
    'use strict';

    angular
        .module('blocks.videoembed')
        .directive('videoembed', function($window, youtubeApiService){
            return {
                restrict: 'E',
                template: '<div></div>',
                replace: true,
                scope: {
                    counter: '='
                },
                link: function(scope, element, attrs){
                    scope.options = scope.$parent.rowCtrl.optionsT[scope.counter];
                    scope.params = scope.$parent.rowCtrl.htmlParamsT[scope.counter];
                    
                    switch(scope.options.videoHost)
                    {
                        case 'youtube':

                            var scripts = document.getElementsByTagName('script');
                            var createScriptTag = true;
                            for (var i = scripts.length; i--;) {
                                if (scripts[i].src == 'https://www.youtube.com/iframe_api')
                                {
                                    createScriptTag = false;
                                }
                            }
                            if( createScriptTag )
                            {
                                var tag = document.createElement('script');
                                tag.src = "https://www.youtube.com/iframe_api";
                                var firstScriptTag = document.getElementsByTagName('script')[0];
                                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
                            }

                            var player;

                            youtubeApiService.onReady(function() {
                                player = setupPlayer(scope, element);
                            });

                            function setupPlayer(scope, element) {
                                
                                var containerID = scope.params.id || 'YTVideo' + Date.now();
                                element.attr('id', containerID);
                                
                                return new YT.Player( containerID, {
                                    playerVars: {
                                        autoplay: 0,
                                        html5: 1,
                                        theme: "light",
                                        modesbranding: 1,
                                        color: "white",
                                        iv_load_policy: 3,
                                        showinfo: 0,
                                        controls: 1,
                                        rel: 0
                                    },
                                    width: '100%',
                                    videoId: scope.options.videoID,
                                });
                            }
                            
                            break;
                        case 'vimeo':
                            break;
                    }

                    element.after('<p class="video-caption">' + scope.options.caption + '</p>');
                }
            }
        })
})();
