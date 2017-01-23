// App header controller
angular.module('taskListApp').controller('headerController', [
    '$scope',
    function($scope) {
        // Header's menu list
        $scope.menuList = [
            {name: 'Main page', link: '#!/mainpage', active: false},
            {name: 'List of tasks', link: '#!/tasklist', active: false}
        ];

        // When received 'pageChanged' event
        $scope.$on('pageChanged', function(event, data) {
            // Choose the active element in the header's menu list
            $scope.menuList.forEach(function(elem) {
                if (elem.name === data.name) {
                    elem.active = true;
                } else {
                    elem.active = false;
                }
            });
        });
    }
]);
