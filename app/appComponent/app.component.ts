import { Component } from '@angular/core';

import { tasksModelService } from './services/tasksModel.service';
import { EventsService } from './services/events.service';

@Component({
    selector: 'app',
    templateUrl: 'appComponent/app.template.html'
})
export class appComponent {
    tasksModel: tasksModelService;

    responseError: {state: boolean, timer: any};
    httpErrorText: string;

    menuList = [
        { name: 'Main page', link: 'mainpage', active: false },
        { name: 'List of tasks', link: 'tasklist', active: false }
    ];

    constructor(tasksModel: tasksModelService, eventsService: EventsService) {
        this.tasksModel = tasksModel;
        this.responseError = { state: false, timer: {} };

        // When selected component is changed
        eventsService.on('pageChanged', (data: any) => {
            // Choose the active element in the header's menu list
            this.menuList.forEach(function(elem) {
                if (elem.name === data.name) {
                    elem.active = true;
                } else {
                    elem.active = false;
                }
            });
        });

        // When some error occured
        eventsService.on('responseError', (event: any) => {
            // If error element is shown - update it's animation
            if (this.responseError.state == true
                && this.responseError.timer) {

                clearTimeout(this.responseError.timer);
                this.responseError.state = false;
            }

            setTimeout(() => {
                this.httpErrorText = 'Received an error from the server';
                this.responseError.state = true;
                this.responseError.timer = setTimeout(() => {
                    this.responseError.state = false;
                }, 4300);
            }, 0);
        });
    }


    updateData() {
        this.tasksModel.updateDataFromDB();
    }
}
