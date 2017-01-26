var taskListComponentController = function($scope, $rootScope,
        $stateParams, tasksModel) {
    /* FUNCTIONS USED BY CONTROLLER */

    // Start task editing
    var editTask = function(task) {
        var i;

        // If any task is already editing - break
        for (i = 0; i < $scope.tasks.length; i++) {
            if ($scope.tasks[i].editing) {
                alert(['You have a task already editing!',
                    'Save or cancel it!'].join(' '));
                return;
            }
        }

        var elemWithSameSeverityExists = false;
        for (i = 0; i < $scope.tasks.length; i++) {
            if ($scope.tasks[i].severity === task.severity) {
                elemWithSameSeverityExists = true;
                break;
            }
        }
        if (!elemWithSameSeverityExists) {
            $scope.tasks.forEach(function(elem) {
                if (elem.severity > task.severity) {
                    elem.severity--;
                }
            });
        }

        $scope.tempTask.severity = task.severity + '';
        $scope.tempTask.text = task.text;
        task.editing = true;
    };

    // Save edited task
    var saveEditTask = function(task) {
        // Check if text field is empty
        if ($scope.tempTask.text === '') {
            alert('Enter something in task\'s text field!');
            return;
        }

        task.severity = +$scope.tempTask.severity;
        task.text = $scope.tempTask.text;
        task.editing = false;

        tasksModel.dbUpdate(task, tasksModel.updateDataFromDB);
    };

    // Cancel task editing
    var cancelEditTask = function(task) {
        task.editing = false;
    };

    // Delete task (button)
    var deleteTask = function(task) {
        $scope.tasks.forEach(function(elem, index) {
            if (task._id === elem._id) {
                $scope.tasks.splice(index, 1);
            }
        });

        var elemWithSameSeverityExists = false;
        for (var i = 0; i < $scope.tasks.length; i++) {
            if ($scope.tasks[i].severity === task.severity) {
                elemWithSameSeverityExists = true;
                break;
            }
        }
        if (!elemWithSameSeverityExists) {
            $scope.tasks.forEach(function(elem) {
                if (elem.severity > task.severity) {
                    elem.severity--;
                }
            });
        }

        tasksModel.dbDelete(task, tasksModel.updateDataFromDB);
    };

    // Check/uncheck complete checkbox
    var changeCompleteState = function(task) {
        tasksModel.dbUpdate(task, tasksModel.updateDataFromDB);
    };

    // Create task (by form above the table)
    var createTask = function() {
        // Check if text field is empty
        if ($scope.taskToCreate.text === '') {
            alert('Enter something in task\'s text field!');
            return;
        }

        $scope.taskToCreate.severity = +$scope.taskToCreate.severity;
        if (!$scope.taskToCreate.severity) {
            $scope.taskToCreate.severity = 1;
        }
        // Offset other severities
        if ($scope.betweenSeverities) {
            $scope.tasks.forEach(function(task) {
                if (task.severity >= $scope.taskToCreate.severity) {
                    task.severity += 1;
                }
            });
        }
        tasksModel.dbInsert({
            severity: $scope.taskToCreate.severity,
            text: $scope.taskToCreate.text,
            completed: false,
            editing: false
        }, $scope.betweenSeverities, tasksModel.updateDataFromDB);

        $scope.taskToCreate.severity = '1';
        $scope.taskToCreate.text = '';
    };




    /* CONTROLLER */
    $rootScope.$broadcast('pageChanged', {name: 'List of tasks'});


    // For the view (and my comfort)
    $scope.tasks = tasksModel.tasks;


    // Temporary object that changing with ng-model on html input
    $scope.tempTask = {};
    // If we need to offset other severities (ng-model on input)
    $scope.betweenSeverities = false;

    // Task will be added after createTask function
    $scope.taskToCreate = {severity: '1', text: ''};

    // Functions defined above
    $scope.editTask = editTask;
    $scope.saveEditTask = saveEditTask;
    $scope.cancelEditTask = cancelEditTask;
    $scope.deleteTask = deleteTask;
    $scope.changeCompleteState = changeCompleteState;
    $scope.createTask = createTask;
};



// Define the TaskList component
angular.module('taskList').component('taskListComponent', {
    templateUrl: 'taskListComponent/taskList.template.html',
    controller: [
        '$scope',
        '$rootScope',
        '$stateParams',
        'tasksModel',
        taskListComponentController
    ]
});
