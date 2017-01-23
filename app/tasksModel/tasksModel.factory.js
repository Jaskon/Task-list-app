// App requests directive
angular.module('taskListApp').factory('tasksModel', [
    '$rootScope',
    '$http',
    function($rootScope, $http) {
        // Model?
        var tasks = [];


        // Template for post requests below
        var post = function(req, obj, callback) {
            $http.post(req, obj)
            .then(function() {
                if (callback) {
                    callback();
                }
            }, function(response) {
                console.log(['Error while doing ', req, ' request:'].join(''));
                console.log(response.config.data);
            });
        };


        // Post request - update ALL tasks in db (sending all tasks)
        var dbUpdateAll = function(callback) {
            post('/updateTasks', tasks, callback);
        };

        // Post request - update task in db
        var dbUpdate = function(task, callback) {
            post('/updateTask', task, callback);
        };

        // Post request - insert task in db
        var dbInsert = function(task, betweenSeverities, callback) {
            post('/insertTask',
                {task:task, betweenSeverities: betweenSeverities},
                callback);
        };

        // Post request - delete task from db
        var dbDelete = function(task, callback) {
            post('/deleteTask', {task: task}, callback);
        };


        // Get request - get all tasks from db (to update local tasks array)
        var updateDataFromDB = function() {
            var i;

            $http.get('/getTasks')
            .then(function(response) {
                // 0 - del/push
                var tasksToDel = new Array(tasks.length);
                for (i = 0; i < tasks.length; i++) {
                    tasksToDel[i] = 0;
                }
                var tasksToPush = new Array(response.data.length);
                for (i = 0; i < response.data.length; i++) {
                    tasksToPush[i] = 0;
                }

                tasks.forEach(function(task, ind) {
                    response.data.forEach(function(respTask, jnd) {
                        if (task._id === respTask._id &&
                            task.severity === respTask.severity &&
                            task.text === respTask.text &&
                            task.completed === respTask.completed) {

                            tasksToDel[ind] = 1;
                            tasksToPush[jnd] = 1;
                        }
                    });
                });

                for (i = tasksToDel.length - 1; i >= 0; i--) {
                    if (tasksToDel[i] === 0) {
                        tasks.splice(i, 1);
                    }
                }
                for (i = 0; i < tasksToPush.length; i++) {
                    if (tasksToPush[i] === 0) {
                        tasks.push(response.data[i]);
                    }
                }
            }, function(response) {
                console.log('Error while updating data from DataBase:');
                console.log(response);
            });
        };



        // Initial
        updateDataFromDB();


        return {
            tasks: tasks,
            dbUpdateAll: dbUpdateAll,
            dbUpdate: dbUpdate,
            dbInsert: dbInsert,
            dbDelete: dbDelete,
            updateDataFromDB: updateDataFromDB
        };
}]);
