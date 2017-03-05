import { task } from './../interfaces';

import { Component } from '@angular/core';
import { tasksModelService } from './../services/tasksModel.service';
import { EventsService } from './../services/events.service';

@Component({
    selector: 'task-list',
    templateUrl: 'appComponent/taskListComponent/taskList.template.html'
})
export class taskListComponent {
    // For the view (and my comfort)
    tasks: task[];
    tasksModel: any;
    // Temporary object that changing with ng-model on html input
    tempTask: task;
    // Task will be added after createTask function
    taskToCreate: task;
    taskToCreateIsInvalid: boolean;

    constructor(tasksModel: tasksModelService, eventsService: EventsService) {
        this.tasksModel = tasksModel;
        this.tasks = tasksModel.tasks;

        // Initialize
        this.tempTask = {_id: '', severity: '', text: '', completed: false};
        this.taskToCreate = {_id: '', severity: '', text: '', completed: false};
        this.taskToCreateIsInvalid = false;

        this.tasksModel.sortTasks();

        eventsService.broadcast('pageChanged', {name: 'List of tasks'});
    }


    // Start task editing
    editTask(task: task): void {
        var i;

        this.tempTask[task._id] = {};
        this.tempTask[task._id].severity = task.severity + '';
        this.tempTask[task._id].text = task.text;
        task.editing = true;
    };

    // Save edited task
    saveEditTask(task: task): void {
        // Check if text field is empty
        if (this.tempTask[task._id].text === '') {
            alert('Enter something in task\'s text field!');
            return;
        }

        task.severity = +this.tempTask[task._id].severity;
        task.text = this.tempTask[task._id].text;
        task.editing = false;

        this.tasksModel.dbUpdate(task);

        this.tasksModel.sortTasks();
    };

    // Save edited task
    // (when pressed ctrl+enter while in textarea of editing task)
    ctrlEnter_SaveEditTask(e: KeyboardEvent, task: task): void {
        if (e.ctrlKey && e.keyCode == 13) {
            this.saveEditTask(task);
        }
    };

    // Cancel task editing
    cancelEditTask(task: task): void {
        task.editing = false;
    };

    // Delete task (button)
    deleteTask(task: task): void {
        this.tasksModel.dbDelete(task);
    };

    // Check/uncheck complete checkbox
    changeCompleteState(task: task): void {
        this.tasksModel.dbUpdate(task);
    };

    // Create task (by form above the table)
    createTask(): void {
        // Check if text field is empty
        if (!this.taskToCreate.text || !this.taskToCreate.severity) {
            this.taskToCreateIsInvalid = true;
            return;
        }

        this.taskToCreate.severity = +this.taskToCreate.severity;
        if (!this.taskToCreate.severity) {
            this.taskToCreate.severity = 0;
        }
        this.tasksModel.dbInsert({
            severity: this.taskToCreate.severity,
            text: this.taskToCreate.text,
            completed: false,
            editing: false
        });

        this.taskToCreateIsInvalid = false;
        this.taskToCreate.severity = '';
        this.taskToCreate.text = '';

        this.tasksModel.sortTasks();
    };
}