import { task } from './../interfaces';

import { Injectable, Input } from '@angular/core';
import { Http } from '@angular/http';

import { EventsService } from './../services/events.service';

@Injectable()
export class tasksModelService {
	tasks: task[];
    
	constructor(private $http: Http, private eventsService: EventsService) {
        this.tasks = [];

        this.updateDataFromDB(this.sortTasks);
    }


    sortTasks(self?: any): void {
        if (self)
            self.tasks.sort((a: task, b: task) => (a.severity as number) - (b.severity as number));
        else
            this.tasks.sort((a, b) => (a.severity as number) - (b.severity as number));
    }


	// Post request - update ALL tasks in db (sending all tasks)
    dbUpdateAll(callback?: Function) {
        this.post('/updateTasks', this.tasks, callback);
    };

    // Post request - update task in db
    dbUpdate(task: task, callback?: Function) {
        this.post('/updateTask', task, callback);

        for (var i = 0; i < this.tasks.length; i++)
            if (this.tasks[i]._id === task._id) {
                for (var j in task)
                    this.tasks[i][j] = task[j];
                break;
            }
    };

    // Post request - insert task in db
    dbInsert(task: task, callback?: Function) {
        this.post('/insertTask',
            {task: task},
            function(response: any) {
                task._id = response.data._id;

                if (callback)
                    callback();
            });

        this.tasks.push(task);
    };

    // Post request - delete task from db
    dbDelete(task: task, callback?: Function) {
        this.post('/deleteTask', {task: task}, callback);

        for (var i = 0; i < this.tasks.length; i++)
            if (this.tasks[i]._id === task._id) {
                this.tasks.splice(i, 1);
                break;
            }
    };


    // Get request - get all tasks from db (to update local tasks array)
    updateDataFromDB(callback?: Function) {
        var i;
        var self = this;

        this.$http.get('/getTasks')
        .toPromise()
        .then(function(response: any) {
            // 0 - del/push
            var tasksToDel = new Array(self.tasks.length);
            for (i = 0; i < self.tasks.length; i++) {
                tasksToDel[i] = 0;
            }
            
            var tasks = response.json();
            var tasksToPush = new Array(tasks.length);
            for (i = 0; i < tasks.length; i++) {
                tasksToPush[i] = 0;
            }

            self.tasks.forEach(function(task: task, ind: number) {
                tasks.forEach(function(respTask: task, jnd: number) {
                    if (task._id === respTask._id &&
                        task.severity === respTask.severity &&
                        task.text === respTask.text &&
                        task.completed === respTask.completed) {

                        // Do not rewrite existing tasks (with 1 value)
                        tasksToDel[ind] = 1;
                        tasksToPush[jnd] = 1;
                    }
                });
            });

            for (i = tasksToDel.length - 1; i >= 0; i--) {
                if (tasksToDel[i] === 0) {
                    self.tasks.splice(i, 1);
                }
            }
            for (i = 0; i < tasksToPush.length; i++) {
                if (tasksToPush[i] === 0) {
                    self.tasks.push(tasks[i]);
                }
            }


            if (callback)
                callback(self);
        })
        .catch((error) => {
            this.eventsService.broadcast('responseError');
            console.error('Error during request: ', error.message || error);
        });
    };

	private post(req: string, obj: any, callback?: Function) {
		this.$http.post(req, obj)
		.toPromise()
        .then(function(response) {
            if (callback) {
                callback(response);
            }
        })
        .catch((error) => {
            this.eventsService.broadcast('responseError');
            console.error('Error during request: ', error.message || error);
        });
	}

    /*private handleError(error: any) {        // 'this' somehow links to 'undefined' instead of class
        this.eventsService.broadcast('responseError');
        console.error('Error during request: ', error.message || error);
    }*/
}