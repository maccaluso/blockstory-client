(function () {
    'use strict';

    angular
        .module('app.frontend')
        .filter('object2Array', function() {
            return function(input) {
                var out = []; 
                for(var i in input){
                    out.push(input[i]);
                }
                return out;
            }
        })
        .controller('FrontendController', FrontendController);

    FrontendController.$inject = ['$window', '$state', '$q', '$scope', 'dataservice'];
    
    function FrontendController($window, $state, $q, $scope, dataservice) {
        var vm = this;
        vm.hideSpinner = false;

        activate();

        function activate() {
            var promises = [dataservice.getStory()];
            return $q.all(promises).then(function(data) {
                                
                vm.rows = data[0].layout.rows;
                
                vm.hideSpinner = true;
            });
        }
    }
})();
