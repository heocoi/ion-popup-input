(function() {
    'use strict';

    angular
    .module('ionPopupInput', ['ionic'])
    .directive('ionPopupInput', ionPopupInput);

    /* @ngInject */
    function ionPopupInput() {
        var directive = {
            restrict: 'EA',
            require: 'ngModel',
            scope: {
                ipiModelInput: '=ngModel',
                ipiTemplateUrl: '=',
                ipiTitle: '@',
                ipiSubTitle: '@',
                ipiButtonOk: '@',
                ipiButtonCancel: '@',
            },
            link: linkFunc,
            controller: Controller,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        function linkFunc(scope, el, attr, ctrl) {
            console.log('ipiPopupInput called');
            el.on('click', scope.vm.showPopup);
        }
    }

    Controller.$inject = ['$scope', '$ionicPopup', '$timeout'];

    /* @ngInject */
    function Controller($scope, $ionicPopup, $timeout) {
        var vm = this;
        angular.extend(vm, {
            bind: {},
            showPopup: showPopup,
            initModel: initModel,
            commit: commit,
        });

        activate();

        function activate() {
            initModel();
        }

        function initModel() {
            vm.bind.input = vm.ipiModelInput;
        }

        function showPopup() {
            console.log('fired');
            var popupOptions = {
                title: vm.ipiTitle || 'Input',
                subTitle: vm.ipiSubTitle || '',
                scope: $scope,
                buttons: [
                    {
                        text: vm.ipiButtonCancel || 'Cancel',
                        onTap: function(e) {
                            $timeout(function() {
                                vm.initModel();
                            }, 200);
                        }
                    },
                    {
                        text: vm.ipiButtonOk || 'Ok',
                        type: 'button-positive',
                        onTap: function(e) {
                            vm.commit();
                        }
                    }
                ]
            };

            if (!vm.ipiTemplateUrl) {
                angular.extend(popupOptions, {
                    template: '<input ng-model="vm.bind.input" type="text" placeholder="Your input">'
                });
            } else {
                angular.extend(popupOptions, {
                    templateUrl: vm.ipiTemplateUrl
                });
            }

            $ionicPopup.show(popupOptions);
        }

        function commit() {
            vm.ipiModelInput = vm.bind.input;
        }
    }
})();
