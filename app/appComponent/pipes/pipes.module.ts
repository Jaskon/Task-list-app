import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { elemInObjsEqualsToCountPipe } from './elemInObjsEqualsToCount.pipe';
import { isUniquePipe } from './isUnique.pipe';
import { objsWithMinVariablePipe } from './objsWithMinVariable.pipe';


@NgModule({
    imports: [
        BrowserModule
    ],
    declarations: [
        elemInObjsEqualsToCountPipe,
        isUniquePipe,
        objsWithMinVariablePipe
    ],
    exports: [
        elemInObjsEqualsToCountPipe,
        isUniquePipe,
        objsWithMinVariablePipe
    ]
})
export class PipesModule { }