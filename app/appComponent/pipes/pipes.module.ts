import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { elemInObjsEqualsToCountPipe } from './elemInObjsEqualsToCount.pipe';
import { isUniquePipe } from './isUnique.pipe';
import { objsVariableEqualsToPipe } from './objsVariableEqualsTo.pipe';
import { objsWithMinVariablePipe } from './objsWithMinVariable.pipe';


@NgModule({
    imports: [
        BrowserModule
    ],
    declarations: [
        elemInObjsEqualsToCountPipe,
        isUniquePipe,
        objsVariableEqualsToPipe,
        objsWithMinVariablePipe
    ],
    exports: [
        elemInObjsEqualsToCountPipe,
        isUniquePipe,
        objsVariableEqualsToPipe,
        objsWithMinVariablePipe
    ]
})
export class PipesModule { }