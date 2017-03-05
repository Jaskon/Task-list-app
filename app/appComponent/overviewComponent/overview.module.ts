import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { overviewComponent } from './overview.component';

import { PipesModule } from './../pipes/pipes.module';

import { tasksModelService } from './../services/tasksModel.service';
import { EventsService } from './../services/events.service';


@NgModule({
	imports: [
        BrowserModule,
        PipesModule
    ],
	declarations: [ overviewComponent ],
    providers: [ tasksModelService, EventsService ],
    exports: [ overviewComponent ],
	bootstrap: [ overviewComponent ]
})
export class overviewModule { }