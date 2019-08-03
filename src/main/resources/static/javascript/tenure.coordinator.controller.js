(function() {

    function CoordinatorAddDialog($scope, $uibModalInstance, dataProvider, uhUuid, offices, selectedOffice) {
        const URL_LOOKUP_NAME = '/tenure/api/person/';
        $scope.uhUuid = uhUuid;
        $scope.offices = offices;
        $scope.selectedOffice = selectedOffice;
        $scope.mydisabled = true;

        $scope.ok = function() {
            var dataObj = {
                uhUuid: $scope.uhUuid,
                officeId: $scope.selectedOffice.id,
                office: $scope.selectedOffice,
                description: "Coordinator for " + $scope.selectedOffice.longDescription
            };
            $uibModalInstance.close(dataObj);
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss("cancel");
        };

        $scope.personSearch = function() {
            var search = $scope.search;
            dataProvider.loadData(function(data) {
                $scope.name = data.cn;
                $scope.uhUuid = data.uhUuid;
                $scope.mydisabled = false;

                if ($scope.uhUuid == null || $scope.uhUuid == "") {
                    $scope.mydisabled = true;
                    $scope.name = "User not found, please try again";
                }
            }, URL_LOOKUP_NAME + encodeURI(search));
        };
    }
    tenureApp.controller("CoordinatorAddDialog", CoordinatorAddDialog);

    function CoordinatorEditDialog($scope, $uibModalInstance, coordinator, offices, selectedOffice) {
        $scope.coordinator = coordinator;
        $scope.offices = offices;
        $scope.officeId = selectedOffice.id;
        $scope.uhUuid = coordinator.uhUuid;
        $scope.isOfficeChanged = false;

        $scope.officeChange = function(selectedOffice) {
            $scope.isOfficeChanged = (coordinator.office.id != selectedOffice.id);
        };

        $scope.ok = function(selectedOffice) {
            if ($scope.isOfficeChanged) {
                $scope.coordinator.office = selectedOffice;
                $scope.coordinator.office.id = selectedOffice.id;
                $scope.coordinator.description = "Coordinator for " + selectedOffice.longDescription;
                var dataObj = {
                    id: $scope.coordinator.id,
                    uhUuid: $scope.uhUuid,
                    office: $scope.coordinator.office,
                    officeId: $scope.coordinator.office.id,
                    description: $scope.coordinator.description,
                    person: $scope.coordinator.person,
                    personId: $scope.coordinator.person.id,
                    role: $scope.coordinator.role
                };
                console.log("CoordinatorEditDialog.ok; dataObj: ", dataObj);

                $uibModalInstance.close(dataObj);
            } else {
                $scope.cancel();
            }
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss("cancel");
        };
    }
    tenureApp.controller("CoordinatorEditDialog", CoordinatorEditDialog);

    function CoordinatorDeleteDialog($scope, $uibModalInstance, coordinator, offices) {
        $scope.coordinator = coordinator;
        $scope.offices = offices;

        $scope.ok = function(coordinator) {
            $uibModalInstance.close(coordinator);
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss("cancel");
        };
    }
    tenureApp.controller("CoordinatorDeleteDialog", CoordinatorDeleteDialog);

    function OfficeJsController($scope, $uibModal, dataProvider) {
        const URL_OFFICE_LIST = '/tenure/api/offices';
        const URL_COORD_LIST = '/tenure/api/coordinators';
        const URL_COORD_ADD = '/tenure/api/coordinators/add';
        const URL_COORD_DEL = '/tenure/api/coordinators/delete';
        const URL_COORD_EDIT = '/tenure/api/coordinators/edit';

        $scope.coordinators = [];
        $scope.offices = [];

        $scope.initedit = function() {
            dataProvider.loadData(function(data) {
                $scope.coordinators = data;
            }, URL_COORD_LIST);
            dataProvider.loadData(function(data) {
                $scope.offices = data;
            }, URL_OFFICE_LIST);
        };

        // Add Coordinator Dialog.
        $scope.addCoordinator = function(offices) {
            $scope.uhUuid = '';
            $scope.offices = offices;
            $scope.selectedOffice = offices[0];

            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'CoordinatorAddModalTemplateId',
                controller: 'CoordinatorAddDialog',
                scope: $scope,
                resolve: {
                    uhUuid: function() {
                        return $scope.uhUuid;
                    },
                    offices: function() {
                        return $scope.offices;
                    },
                    selectedOffice: function() {
                        return $scope.selectedOffice;
                    }
                }
            });

            modalInstance.result.then(function(data) {
                dataProvider.saveData(function(data) {
                    console.log('A. BACK FROM SAVE TO DB; ', data);
                    $scope.coordinators.push(data);
                }, URL_COORD_ADD, data);
            }, function() {
                console.log('A. Modal dismissed at: ' + new Date());
            });

        };

        // Edit Coordinator Dialog.
        $scope.editCoordinator = function(coordinator, offices) {
            $scope.coordinator = coordinator;
            $scope.offices = offices;
            $scope.selectedOffice = findById(coordinator.office.id, offices);
            console.log("editCoordinator; coordinator: ", coordinator);
            console.log("editCoordinator; coordinator.person: ", coordinator.person);

            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'CoordinatorEditModalTemplateId',
                controller: 'CoordinatorEditDialog',
                scope: $scope,
                resolve: {
                    coordinator: function() {
                        return $scope.coordinator;
                    },
                    offices: function() {
                        return $scope.offices;
                    },
                    selectedOffice: function() {
                        return $scope.selectedOffice;
                    }
                }
            });

            modalInstance.result.then(function(data) {
                dataProvider.saveData(function(data) {
                    console.log('B. BACK FROM SAVE TO DB ');
                    // Maybe do something here?
                }, URL_COORD_EDIT, data);
            }, function() {
                console.log('B. Modal dismissed at: ' + new Date());
            });
        };

        // Remove Coordinator Dialog.
        $scope.removeCoordinator = function(coordinator, offices) {
            $scope.coordinator = coordinator;
            $scope.offices = offices;

            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'CoordinatorDeleteModalTemplateId',
                controller: 'CoordinatorDeleteDialog',
                resolve: {
                    coordinator: function() {
                        return $scope.coordinator;
                    },
                    offices: function() {
                        return $scope.offices;
                    }
                }
            });

            modalInstance.result.then(function(dataObj) {
                var postUrl = URL_COORD_DEL + '/' + dataObj.id
                dataProvider.delData(function(data) {
                    var index = findIndex(dataObj, $scope.coordinators);
                    $scope.coordinators.splice(index, 1);
                }, postUrl);
                console.log("OfficeJsController.remove; uhUuid: " + dataObj.id)
            }, function() {
                console.log('OfficeJsController; modal canceled.');
            });
        };

        function findById(id, myArray) {
            for (var i = 0; i < myArray.length; i++) {
                if (myArray[i].id === id) {
                    return myArray[i];
                }
            }
        }

        function findIndex(c, myArray) {
            for (var i = 0; i < myArray.length; i++) {
                if (myArray[i].id === c.id) {
                    return i;
                }
            }
        }
    }
    tenureApp.controller("OfficeJsController", OfficeJsController);

})();
