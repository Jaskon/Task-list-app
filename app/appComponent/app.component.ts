import { Component } from '@angular/core';

import { tasksModelService } from './tasksModel/tasksModel.service';

@Component({
    selector: 'app',
    templateUrl: 'appComponent/app.template.html'
})
export class appComponent {
    tasksModel: tasksModelService;
    menuList = [
        { name: 'Main page', link: 'mainpage', active: false },
        { name: 'List of tasks', link: 'tasklist', active: false }
    ];

    constructor(tasksModel: tasksModelService) {
        this.tasksModel = tasksModel;
    }


    updateData() {
        this.tasksModel.updateDataFromDB();
    }
}
