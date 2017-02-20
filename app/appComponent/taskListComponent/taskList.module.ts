import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { taskListComponent } from './taskList.component';

import { PipesModule } from './../pipes/pipes.module';
import { tasksModelService } from './../tasksModel/tasksModel.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        PipesModule
    ],
    declarations: [ taskListComponent ],
    providers: [ tasksModelService ],
    exports: [ taskListComponent ],
    bootstrap: [ taskListComponent ]
})
export class taskListModule { }