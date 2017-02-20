import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { appComponent } from './app.component';
import { overviewModule } from './overviewComponent/overview.module';
import { taskListModule } from './taskListComponent/taskList.module';

import { tasksModelService } from './tasksModel/tasksModel.service';
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
    providers: [ tasksModelService ],
    bootstrap: [ appComponent ]
})
export class appModule {  }
