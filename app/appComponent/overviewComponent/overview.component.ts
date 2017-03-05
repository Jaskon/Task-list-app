import { Component } from '@angular/core';
import { tasksModelService } from './../services/tasksModel.service';

@Component({
	selector: 'list-overview',
	templateUrl: 'appComponent/overviewComponent/overview.template.html'
})
export class overviewComponent {
    tasks: any;

    constructor(tasksModel: tasksModelService) {
        this.tasks = tasksModel.tasks;
    }
}