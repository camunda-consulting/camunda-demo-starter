// import angular from "angular";

export default {

    id: "process-definitions",
    pluginPoint: "cockpit.dashboard",
    priority: 12,
    label: "Deployed Processes",
    render: container => {
        container.innerHTML = "Hello World!";
    }



    // render: node => {
    //
    //     var dashboardController = ["$scope", "$http", "Uri", function($scope, $http, Uri) {
    //
    //         $http({
    //             method: 'GET',
    //             url: Uri.appUri('plugin://sample-plugin/:engine/process-instance')
    //         }).then(function(response) {
    //             if (!response.data.errorMessage) {
    //                 $scope.processInstanceCounts = response.data;
    //             } else {
    //                 $scope.deserializationError = response.data.errorMessage;
    //             }
    //         });
    //
    //     }];
    //
    //     var ngModule = angular.module("process-definitions", []);
    //     ngModule.controller(
    //         "dashboardController",
    //         dashboardController
    //     );
    //
    //     // node.innerHTML = template;
    //
    //     angular.bootstrap(node, [ngModule.name]);
    // }

};
