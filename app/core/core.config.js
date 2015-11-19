(function () {
    'use strict';

    var core = angular.module('app.core');

    var config = {
        appErrorPrefix: '[BSClient Error] ',
        appTitle: 'Blockstory Client'
    };

    core.value('config', config);

    core.config(configure);

    configure.$inject = ['routerHelperProvider', '$httpProvider'];
    /* @ngInject */
    function configure(routerHelperProvider, $httpProvider) {
        routerHelperProvider.configure({
            docTitle: config.appTitle + ': ',
            baseHref: '/'
        });
        // $httpProvider.interceptors.push(function($q, $location, LoopBackAuth) {
        //   return {
        //     responseError: function(rejection) {
        //       if (rejection.status == 401) {
        //         //Now clearing the loopback values from client browser for safe logout...
        //         LoopBackAuth.clearUser();
        //         LoopBackAuth.clearStorage();
        //         console.log('cleared stored user');
        //         $location.nextAfterLogin = $location.path();
        //         // if($location.path() != '/beacons' && $location.path() != '/' )
        //         // {
        //         //     console.log('redirecting');
        //         //     $location.path('/login');
        //         // }
        //       }
        //       return $q.reject(rejection);
        //     }
        //   };
        // });

        // $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

        /**
        * The workhorse; converts an object to x-www-form-urlencoded serialization.
        * @param {Object} obj
        * @return {String}
        */ 
        // var param = function(obj) {
        //     var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
              
        //     for(name in obj) {
        //       value = obj[name];
                
        //       if(value instanceof Array) {
        //         for(i=0; i<value.length; ++i) {
        //           subValue = value[i];
        //           fullSubName = name + '[' + i + ']';
        //           innerObj = {};
        //           innerObj[fullSubName] = subValue;
        //           query += param(innerObj) + '&';
        //         }
        //       }
        //       else if(value instanceof Object) {
        //         for(subName in value) {
        //           subValue = value[subName];
        //           fullSubName = name + '[' + subName + ']';
        //           innerObj = {};
        //           innerObj[fullSubName] = subValue;
        //           query += param(innerObj) + '&';
        //         }
        //       }
        //       else if(value !== undefined && value !== null)
        //         query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
        //     }
              
        //     return query.length ? query.substr(0, query.length - 1) : query;
        // };

        // // Override $http service's default transformRequest
        // $httpProvider.defaults.transformRequest = [function(data) {
        //     return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
        // }];
    }

})();
