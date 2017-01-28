angular.module("mainPage",["ui.router","myFilters.elemInObjsEqualsToCount","myFilters.objsWithMinVariable"]),angular.module("mainPage").component("mainPageComponent",{templateUrl:"mainPageComponent/mainPage.template.html",controller:["$scope","$rootScope","$stateParams","$timeout","tasksModel",function(t,e,a,s,o){e.$broadcast("pageChanged",{name:"Main page"}),t.tasks=o.tasks;var n=function(){t.date=Date.now(),s(n,1e3)};n()}]}),angular.module("taskList",["ui.router","angular.filter","myFilters.isUnique","taskListApp"]);var taskListComponentController=function(t,e,a,s){var o=function(e){var a;for(a=0;a<t.tasks.length;a++)if(t.tasks[a].editing)return void alert(["You have a task already editing!","Save or cancel it!"].join(" "));t.tempTask.severity=e.severity+"",t.tempTask.text=e.text,e.editing=!0},n=function(e){return""===t.tempTask.text?void alert("Enter something in task's text field!"):(e.severity=+t.tempTask.severity,e.text=t.tempTask.text,e.editing=!1,void s.dbUpdate(e,s.updateDataFromDB))},i=function(t,e){t.ctrlKey&&13==t.keyCode&&n(e)},r=function(t){t.editing=!1},l=function(e){t.tasks.forEach(function(a,s){e._id===a._id&&t.tasks.splice(s,1)}),s.dbDelete(e,s.updateDataFromDB)},m=function(t){s.dbUpdate(t,s.updateDataFromDB)},k=function(){return""===t.taskToCreate.text?void alert("Enter something in task's text field!"):(t.taskToCreate.severity=+t.taskToCreate.severity,t.taskToCreate.severity||(t.taskToCreate.severity=1),s.dbInsert({severity:t.taskToCreate.severity,text:t.taskToCreate.text,completed:!1,editing:!1},s.updateDataFromDB),t.taskToCreate.severity="1",void(t.taskToCreate.text=""))};e.$broadcast("pageChanged",{name:"List of tasks"}),t.tasks=s.tasks,t.tempTask={},t.taskToCreate={severity:"1",text:""},t.editTask=o,t.saveEditTask=n,t.ctrlEnter_SaveEditTask=i,t.cancelEditTask=r,t.deleteTask=l,t.changeCompleteState=m,t.createTask=k};angular.module("taskList").component("taskListComponent",{templateUrl:"taskListComponent/taskList.template.html",controller:["$scope","$rootScope","$stateParams","tasksModel",taskListComponentController]});