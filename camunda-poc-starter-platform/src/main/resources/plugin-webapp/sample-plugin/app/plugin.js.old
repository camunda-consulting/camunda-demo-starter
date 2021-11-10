define(['angular'], function(angular) {

    var DashboardController = ["$scope", "$http", "Uri", function($scope, $http, Uri) {

        $http({
            method: 'GET',
            url: Uri.appUri('plugin://sample-plugin/:engine/process-instance')
        }).then(function(response) {
            if (!response.data.errorMessage) {
                $scope.processInstanceCounts = response.data;
            } else {
                $scope.deserializationError = response.data.errorMessage;
            }
        });

    }];

    var Configuration = ['ViewsProvider', function(ViewsProvider) {

        ViewsProvider.registerDefaultView('cockpit.dashboard', {
            id: 'process-definitions',
            label: 'Deployed Processes',
            url: 'plugin://sample-plugin/static/app/dashboard.html',
            controller: DashboardController,

            // make sure we have a higher priority than the default plugin
            priority: 12
        });
    }];

    var ngModule = angular.module('cockpit.plugin.sample-plugin', []);

    ngModule.config(Configuration);

    return ngModule;
});