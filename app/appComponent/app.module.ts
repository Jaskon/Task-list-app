import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { appComponent } from './app.component';
import { overviewModule } from './overviewComponent/overview.module';
import { taskListModule } from './taskListComponent/taskList.module';

import { tasksModelService } from './services/tasksModel.service';
import { EventsService } from './services/events.service';
import { appRoutingModule } from './appRouting/appRouting.module';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        overviewModule,
        taskListModule,
        appRoutingModule
    ],
    declarations: [ appComponent ],
    providers: [ tasksModelService, EventsService ],
    bootstrap: [ appComponent ]
})
export class appModule {  }
