import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import components
import { overviewComponent } from './../overviewComponent/overview.component';
import { taskListComponent } from './../taskListComponent/taskList.component';

const routes: Routes = [
    { path:'', redirectTo: '/mainpage', pathMatch: 'full' },
    { path:'mainpage', component: overviewComponent },
    { path:'tasklist', component: taskListComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes, {useHash: true}) ],
    exports: [ RouterModule ]
})
export class appRoutingModule {}
