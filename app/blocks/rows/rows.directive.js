(function () {
    'use strict';

    angular
        .module('blocks.rows')
        .directive('rows', function($compile){
            return {
                restrict: 'E',
                controller: function(){
                    this.getOptions = function() {
                        console.log(this);
                    }
                },
                controllerAs: 'rowCtrl',
                link: function(scope, element, attrs){

                    scope.rowCtrl.optionsT = [];
                    scope.rowCtrl.htmlParamsT = [];
                    scope.rowCtrl.collectionsT = [];
                    var counter = 0;

                    var html = '';

                    html = '<div class="row">';
                    angular.forEach(scope.row.layout, function(value,key){
                        var off = undefined;
                        value.mdoffset ? off = ' col-md-offset-' + value.mdoffset : off = '';
                        html += '<div class="col-md-' + value.spanmd + off + '">';
                            html += '<' + value.directiveName;
                            
                            scope.options = value.directiveOptions;
                            scope.htmlParams = value.directiveHtmlParams;

                            // console.log( value );
                            scope.rowCtrl.optionsT[counter] = value.directiveOptions;
                            scope.rowCtrl.collectionsT[counter] = value.directiveCollections;
                            scope.rowCtrl.htmlParamsT[counter] = value.directiveHtmlParams;

                            angular.forEach(value.directiveHtmlParams, function(v,k){
                                html += ' ' + k + '="' + v + '"';
                            });
                            html += ' counter="' + counter + '"></' + value.directiveName + '>';
                        html += '</div>';
                        counter++;
                    });
                    html += '</div>';

                    var e = $compile(html)(scope);
                    element.replaceWith(e);

                }
            }
        })
})();
