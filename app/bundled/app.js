webpackJsonp([0],{

/***/ 1041:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const platform_browser_dynamic_1 = __webpack_require__(148);
__webpack_require__(306);
const app_module_1 = __webpack_require__(461);
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.appModule);


/***/ }),

/***/ 107:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(1);
const Rx = __webpack_require__(305);
let EventsService = class EventsService {
    constructor() {
        this.listeners = {};
        this.eventsSubject = new Rx.Subject();
        this.events = Rx.Observable.from(this.eventsSubject);
        this.events.subscribe(({ name, args }) => {
            if (this.listeners[name]) {
                for (let listener of this.listeners[name]) {
                    listener(...args);
                }
            }
        });
    }
    on(name, listener) {
        if (!this.listeners[name]) {
            this.listeners[name] = [];
        }
        this.listeners[name].push(listener);
    }
    broadcast(name, ...args) {
        this.eventsSubject.next({
            name,
            args
        });
    }
};
EventsService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], EventsService);
exports.EventsService = EventsService;


/***/ }),

/***/ 108:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(1);
const http_1 = __webpack_require__(116);
const events_service_1 = __webpack_require__(107);
let tasksModelService = class tasksModelService {
    constructor($http, eventsService) {
        this.$http = $http;
        this.eventsService = eventsService;
        this.tasks = [];
        this.updateDataFromDB(this.sortTasks);
    }
    sortTasks(self) {
        if (self)
            self.tasks.sort((a, b) => a.severity - b.severity);
        else
            this.tasks.sort((a, b) => a.severity - b.severity);
    }
    // Post request - update ALL tasks in db (sending all tasks)
    dbUpdateAll(callback) {
        this.post('/updateTasks', this.tasks, callback);
    }
    ;
    // Post request - update task in db
    dbUpdate(task, callback) {
        this.post('/updateTask', task, callback);
        for (var i = 0; i < this.tasks.length; i++)
            if (this.tasks[i]._id === task._id) {
                for (var j in task)
                    this.tasks[i][j] = task[j];
                break;
            }
    }
    ;
    // Post request - insert task in db
    dbInsert(task, callback) {
        this.post('/insertTask', { task: task }, function (response) {
            console.log('Hi! ^_^');
            task._id = response.json()._id;
            if (callback)
                callback();
        });
        this.tasks.push(task);
    }
    ;
    // Post request - delete task from db
    dbDelete(task, callback) {
        this.post('/deleteTask', { task: task }, callback);
        for (var i = 0; i < this.tasks.length; i++)
            if (this.tasks[i]._id === task._id) {
                this.tasks.splice(i, 1);
                break;
            }
    }
    ;
    // Get request - get all tasks from db (to update local tasks array)
    updateDataFromDB(callback) {
        var i;
        var self = this;
        this.$http.get('/getTasks')
            .toPromise()
            .then(function (response) {
            // 0 - del/push
            var tasksToDel = new Array(self.tasks.length);
            for (i = 0; i < self.tasks.length; i++) {
                tasksToDel[i] = 0;
            }
            var tasks = response.json();
            var tasksToPush = new Array(tasks.length);
            for (i = 0; i < tasks.length; i++) {
                tasksToPush[i] = 0;
            }
            self.tasks.forEach(function (task, ind) {
                tasks.forEach(function (respTask, jnd) {
                    if (task._id === respTask._id &&
                        task.severity === respTask.severity &&
                        task.text === respTask.text &&
                        task.completed === respTask.completed) {
                        // Do not rewrite existing tasks (with 1 value)
                        tasksToDel[ind] = 1;
                        tasksToPush[jnd] = 1;
                    }
                });
            });
            for (i = tasksToDel.length - 1; i >= 0; i--) {
                if (tasksToDel[i] === 0) {
                    self.tasks.splice(i, 1);
                }
            }
            for (i = 0; i < tasksToPush.length; i++) {
                if (tasksToPush[i] === 0) {
                    self.tasks.push(tasks[i]);
                }
            }
            if (callback)
                callback(self);
        })
            .catch((error) => {
            this.eventsService.broadcast('responseError');
            console.error('Error during request: ', error.message || error);
        });
    }
    ;
    post(req, obj, callback) {
        this.$http.post(req, obj)
            .toPromise()
            .then(function (response) {
            if (callback) {
                callback(response);
            }
        })
            .catch((error) => {
            this.eventsService.broadcast('responseError');
            console.error('Error during request: ', error.message || error);
        });
    }
};
tasksModelService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, events_service_1.EventsService])
], tasksModelService);
exports.tasksModelService = tasksModelService;


/***/ }),

/***/ 397:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(1);
const tasksModel_service_1 = __webpack_require__(108);
let overviewComponent = class overviewComponent {
    constructor(tasksModel) {
        this.tasks = tasksModel.tasks;
    }
};
overviewComponent = __decorate([
    core_1.Component({
        selector: 'list-overview',
        templateUrl: 'appComponent/overviewComponent/overview.template.html'
    }),
    __metadata("design:paramtypes", [tasksModel_service_1.tasksModelService])
], overviewComponent);
exports.overviewComponent = overviewComponent;


/***/ }),

/***/ 398:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(1);
const platform_browser_1 = __webpack_require__(65);
const elemInObjsEqualsToCount_pipe_1 = __webpack_require__(586);
const isUnique_pipe_1 = __webpack_require__(587);
const objsVariableEqualsTo_pipe_1 = __webpack_require__(588);
const objsWithMinVariable_pipe_1 = __webpack_require__(589);
let PipesModule = class PipesModule {
};
PipesModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule
        ],
        declarations: [
            elemInObjsEqualsToCount_pipe_1.elemInObjsEqualsToCountPipe,
            isUnique_pipe_1.isUniquePipe,
            objsVariableEqualsTo_pipe_1.objsVariableEqualsToPipe,
            objsWithMinVariable_pipe_1.objsWithMinVariablePipe
        ],
        exports: [
            elemInObjsEqualsToCount_pipe_1.elemInObjsEqualsToCountPipe,
            isUnique_pipe_1.isUniquePipe,
            objsVariableEqualsTo_pipe_1.objsVariableEqualsToPipe,
            objsWithMinVariable_pipe_1.objsWithMinVariablePipe
        ]
    })
], PipesModule);
exports.PipesModule = PipesModule;


/***/ }),

/***/ 399:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(1);
const tasksModel_service_1 = __webpack_require__(108);
const events_service_1 = __webpack_require__(107);
let taskListComponent = class taskListComponent {
    constructor(tasksModel, eventsService) {
        this.tasksModel = tasksModel;
        this.tasks = tasksModel.tasks;
        // Initialize
        this.tempTask = { _id: '', severity: '', text: '', completed: false };
        this.taskToCreate = { _id: '', severity: '', text: '', completed: false };
        this.taskToCreateIsInvalid = false;
        this.tasksModel.sortTasks();
        eventsService.broadcast('pageChanged', { name: 'List of tasks' });
    }
    // Start task editing
    editTask(task) {
        var i;
        this.tempTask[task._id] = {};
        this.tempTask[task._id].severity = task.severity + '';
        this.tempTask[task._id].text = task.text;
        task.editing = true;
    }
    ;
    // Save edited task
    saveEditTask(task) {
        // Check if text field is empty
        if (this.tempTask[task._id].text === '') {
            alert('Enter something in task\'s text field!');
            return;
        }
        task.severity = +this.tempTask[task._id].severity;
        task.text = this.tempTask[task._id].text;
        task.editing = false;
        this.tasksModel.dbUpdate(task);
        this.tasksModel.sortTasks();
    }
    ;
    // Save edited task
    // (when pressed ctrl+enter while in textarea of editing task)
    ctrlEnter_SaveEditTask(e, task) {
        if (e.ctrlKey && e.keyCode == 13) {
            this.saveEditTask(task);
        }
    }
    ;
    // Cancel task editing
    cancelEditTask(task) {
        task.editing = false;
    }
    ;
    // Delete task (button)
    deleteTask(task) {
        this.tasksModel.dbDelete(task);
    }
    ;
    // Check/uncheck complete checkbox
    changeCompleteState(task) {
        this.tasksModel.dbUpdate(task);
    }
    ;
    // Create task (by form above the table)
    createTask() {
        // Check if text field is empty
        if (!this.taskToCreate.text || !this.taskToCreate.severity) {
            this.taskToCreateIsInvalid = true;
            return;
        }
        this.taskToCreate.severity = +this.taskToCreate.severity;
        if (!this.taskToCreate.severity) {
            this.taskToCreate.severity = 0;
        }
        this.tasksModel.dbInsert({
            severity: this.taskToCreate.severity,
            text: this.taskToCreate.text,
            completed: false,
            editing: false
        });
        this.taskToCreateIsInvalid = false;
        this.taskToCreate.severity = '';
        this.taskToCreate.text = '';
        this.tasksModel.sortTasks();
    }
    ;
};
taskListComponent = __decorate([
    core_1.Component({
        selector: 'task-list',
        templateUrl: 'appComponent/taskListComponent/taskList.template.html'
    }),
    __metadata("design:paramtypes", [tasksModel_service_1.tasksModelService, events_service_1.EventsService])
], taskListComponent);
exports.taskListComponent = taskListComponent;


/***/ }),

/***/ 461:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(1);
const http_1 = __webpack_require__(116);
const platform_browser_1 = __webpack_require__(65);
const app_component_1 = __webpack_require__(583);
const overview_module_1 = __webpack_require__(585);
const taskList_module_1 = __webpack_require__(590);
const tasksModel_service_1 = __webpack_require__(108);
const events_service_1 = __webpack_require__(107);
const appRouting_module_1 = __webpack_require__(584);
let appModule = class appModule {
};
appModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            http_1.HttpModule,
            overview_module_1.overviewModule,
            taskList_module_1.taskListModule,
            appRouting_module_1.appRoutingModule
        ],
        declarations: [app_component_1.appComponent],
        providers: [tasksModel_service_1.tasksModelService, events_service_1.EventsService],
        bootstrap: [app_component_1.appComponent]
    })
], appModule);
exports.appModule = appModule;


/***/ }),

/***/ 583:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(1);
const tasksModel_service_1 = __webpack_require__(108);
const events_service_1 = __webpack_require__(107);
let appComponent = class appComponent {
    constructor(tasksModel, eventsService) {
        this.menuList = [
            { name: 'Main page', link: 'mainpage', active: false },
            { name: 'List of tasks', link: 'tasklist', active: false }
        ];
        this.tasksModel = tasksModel;
        this.responseError = { state: false, timer: {} };
        // When selected component is changed
        eventsService.on('pageChanged', (data) => {
            // Choose the active element in the header's menu list
            this.menuList.forEach(function (elem) {
                if (elem.name === data.name) {
                    elem.active = true;
                }
                else {
                    elem.active = false;
                }
            });
        });
        // When some error occured
        eventsService.on('responseError', (event) => {
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
};
appComponent = __decorate([
    core_1.Component({
        selector: 'app',
        templateUrl: 'appComponent/app.template.html'
    }),
    __metadata("design:paramtypes", [tasksModel_service_1.tasksModelService, events_service_1.EventsService])
], appComponent);
exports.appComponent = appComponent;


/***/ }),

/***/ 584:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(1);
const router_1 = __webpack_require__(304);
// Import components
const overview_component_1 = __webpack_require__(397);
const taskList_component_1 = __webpack_require__(399);
const routes = [
    { path: '', redirectTo: '/mainpage', pathMatch: 'full' },
    { path: 'mainpage', component: overview_component_1.overviewComponent },
    { path: 'tasklist', component: taskList_component_1.taskListComponent }
];
let appRoutingModule = class appRoutingModule {
};
appRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forRoot(routes, { useHash: true })],
        exports: [router_1.RouterModule]
    })
], appRoutingModule);
exports.appRoutingModule = appRoutingModule;


/***/ }),

/***/ 585:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(1);
const platform_browser_1 = __webpack_require__(65);
const overview_component_1 = __webpack_require__(397);
const pipes_module_1 = __webpack_require__(398);
const tasksModel_service_1 = __webpack_require__(108);
const events_service_1 = __webpack_require__(107);
let overviewModule = class overviewModule {
};
overviewModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            pipes_module_1.PipesModule
        ],
        declarations: [overview_component_1.overviewComponent],
        providers: [tasksModel_service_1.tasksModelService, events_service_1.EventsService],
        exports: [overview_component_1.overviewComponent],
        bootstrap: [overview_component_1.overviewComponent]
    })
], overviewModule);
exports.overviewModule = overviewModule;


/***/ }),

/***/ 586:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(1);
let elemInObjsEqualsToCountPipe = class elemInObjsEqualsToCountPipe {
    transform(collection, key, value) {
        var count = 0;
        collection.forEach(function (item) {
            if (item[key] === value) {
                count++;
            }
        });
        return count;
    }
};
elemInObjsEqualsToCountPipe = __decorate([
    core_1.Pipe({
        name: 'elemInObjsEqualsToCount',
        pure: false
    })
], elemInObjsEqualsToCountPipe);
exports.elemInObjsEqualsToCountPipe = elemInObjsEqualsToCountPipe;


/***/ }),

/***/ 587:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(1);
// Filter that check if there is no another values with this key
// in this collection
let isUniquePipe = class isUniquePipe {
    transform(collection, key, value) {
        var count = 0;
        collection.forEach(function (item) {
            if (item[key] === value) {
                count++;
            }
        });
        // 1 - itself
        return count > 1 ? false : true;
    }
};
isUniquePipe = __decorate([
    core_1.Pipe({
        name: 'isUnique'
    })
], isUniquePipe);
exports.isUniquePipe = isUniquePipe;


/***/ }),

/***/ 588:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(1);
// Filter that check if there is no another values with this key
// in this collection
let objsVariableEqualsToPipe = class objsVariableEqualsToPipe {
    transform(collection, key, value) {
        var resColl = [];
        collection.forEach(function (item) {
            if (item[key] === value) {
                resColl.push(item);
            }
        });
        return resColl;
    }
};
objsVariableEqualsToPipe = __decorate([
    core_1.Pipe({
        name: 'objsVariableEqualsTo',
        pure: false
    })
], objsVariableEqualsToPipe);
exports.objsVariableEqualsToPipe = objsVariableEqualsToPipe;


/***/ }),

/***/ 589:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(1);
let objsWithMinVariablePipe = class objsWithMinVariablePipe {
    transform(collection, key) {
        if (collection[0] == undefined)
            return collection;
        var min = collection[0][key];
        var i;
        for (i = 1; i < collection.length; i++) {
            if (collection[i][key] < min) {
                min = collection[i][key];
            }
        }
        var objs = [];
        for (i = 0; i < collection.length; i++) {
            if (collection[i][key] === min) {
                objs.push(collection[i]);
            }
        }
        return objs;
    }
};
objsWithMinVariablePipe = __decorate([
    core_1.Pipe({
        name: 'objsWithMinVariable',
        pure: false
    })
], objsWithMinVariablePipe);
exports.objsWithMinVariablePipe = objsWithMinVariablePipe;


/***/ }),

/***/ 590:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(1);
const platform_browser_1 = __webpack_require__(65);
const forms_1 = __webpack_require__(303);
const taskList_component_1 = __webpack_require__(399);
const pipes_module_1 = __webpack_require__(398);
const tasksModel_service_1 = __webpack_require__(108);
const events_service_1 = __webpack_require__(107);
let taskListModule = class taskListModule {
};
taskListModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            pipes_module_1.PipesModule
        ],
        declarations: [taskList_component_1.taskListComponent],
        providers: [tasksModel_service_1.tasksModelService, events_service_1.EventsService],
        exports: [taskList_component_1.taskListComponent],
        bootstrap: [taskList_component_1.taskListComponent]
    })
], taskListModule);
exports.taskListModule = taskListModule;


/***/ })

},[1041]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ib290c3RyYXAudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwQ29tcG9uZW50L3NlcnZpY2VzL2V2ZW50cy5zZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL2FwcENvbXBvbmVudC9zZXJ2aWNlcy90YXNrc01vZGVsLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwQ29tcG9uZW50L292ZXJ2aWV3Q29tcG9uZW50L292ZXJ2aWV3LmNvbXBvbmVudC50cyIsIndlYnBhY2s6Ly8vLi9hcHBDb21wb25lbnQvcGlwZXMvcGlwZXMubW9kdWxlLnRzIiwid2VicGFjazovLy8uL2FwcENvbXBvbmVudC90YXNrTGlzdENvbXBvbmVudC90YXNrTGlzdC5jb21wb25lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwQ29tcG9uZW50L2FwcC5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwQ29tcG9uZW50L2FwcC5jb21wb25lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwQ29tcG9uZW50L2FwcFJvdXRpbmcvYXBwUm91dGluZy5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwQ29tcG9uZW50L292ZXJ2aWV3Q29tcG9uZW50L292ZXJ2aWV3Lm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vLi9hcHBDb21wb25lbnQvcGlwZXMvZWxlbUluT2Jqc0VxdWFsc1RvQ291bnQucGlwZS50cyIsIndlYnBhY2s6Ly8vLi9hcHBDb21wb25lbnQvcGlwZXMvaXNVbmlxdWUucGlwZS50cyIsIndlYnBhY2s6Ly8vLi9hcHBDb21wb25lbnQvcGlwZXMvb2Jqc1ZhcmlhYmxlRXF1YWxzVG8ucGlwZS50cyIsIndlYnBhY2s6Ly8vLi9hcHBDb21wb25lbnQvcGlwZXMvb2Jqc1dpdGhNaW5WYXJpYWJsZS5waXBlLnRzIiwid2VicGFjazovLy8uL2FwcENvbXBvbmVudC90YXNrTGlzdENvbXBvbmVudC90YXNrTGlzdC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7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InNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHBsYXRmb3JtQnJvd3NlckR5bmFtaWMgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyLWR5bmFtaWMnO1xyXG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL3RvUHJvbWlzZSc7XHJcblxyXG5pbXBvcnQgeyBhcHBNb2R1bGUgfSBmcm9tICcuL2FwcENvbXBvbmVudC9hcHAubW9kdWxlJztcclxuXHJcbnBsYXRmb3JtQnJvd3NlckR5bmFtaWMoKS5ib290c3RyYXBNb2R1bGUoYXBwTW9kdWxlKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ib290c3RyYXAudHMiLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCAqIGFzIFJ4IGZyb20gJ3J4anMvUngnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRXZlbnRzU2VydmljZSB7XHJcbiAgICBsaXN0ZW5lcnM6IGFueTtcclxuICAgIGV2ZW50c1N1YmplY3Q6IGFueTtcclxuICAgIGV2ZW50czogYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMubGlzdGVuZXJzID0ge307XHJcbiAgICAgICAgdGhpcy5ldmVudHNTdWJqZWN0ID0gbmV3IFJ4LlN1YmplY3QoKTtcclxuXHJcbiAgICAgICAgdGhpcy5ldmVudHMgPSBSeC5PYnNlcnZhYmxlLmZyb20odGhpcy5ldmVudHNTdWJqZWN0KTtcclxuXHJcbiAgICAgICAgdGhpcy5ldmVudHMuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAoe25hbWUsIGFyZ3N9OiB7bmFtZTogYW55LCBhcmdzOiBhbnlbXX0pID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxpc3RlbmVyc1tuYW1lXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGxpc3RlbmVyIG9mIHRoaXMubGlzdGVuZXJzW25hbWVdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyKC4uLmFyZ3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgb24obmFtZTogc3RyaW5nLCBsaXN0ZW5lcjogRnVuY3Rpb24pIHtcclxuICAgICAgICBpZiAoIXRoaXMubGlzdGVuZXJzW25hbWVdKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGlzdGVuZXJzW25hbWVdID0gW107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmxpc3RlbmVyc1tuYW1lXS5wdXNoKGxpc3RlbmVyKTtcclxuICAgIH1cclxuXHJcbiAgICBicm9hZGNhc3QobmFtZTogc3RyaW5nLCAuLi5hcmdzOiBhbnlbXSkge1xyXG4gICAgICAgIHRoaXMuZXZlbnRzU3ViamVjdC5uZXh0KHtcclxuICAgICAgICAgICAgbmFtZSxcclxuICAgICAgICAgICAgYXJnc1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwQ29tcG9uZW50L3NlcnZpY2VzL2V2ZW50cy5zZXJ2aWNlLnRzIiwiaW1wb3J0IHsgdGFzayB9IGZyb20gJy4vLi4vaW50ZXJmYWNlcyc7XHJcblxyXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XHJcblxyXG5pbXBvcnQgeyBFdmVudHNTZXJ2aWNlIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy9ldmVudHMuc2VydmljZSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyB0YXNrc01vZGVsU2VydmljZSB7XHJcblx0dGFza3M6IHRhc2tbXTtcclxuICAgIFxyXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgJGh0dHA6IEh0dHAsIHByaXZhdGUgZXZlbnRzU2VydmljZTogRXZlbnRzU2VydmljZSkge1xyXG4gICAgICAgIHRoaXMudGFza3MgPSBbXTtcclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVEYXRhRnJvbURCKHRoaXMuc29ydFRhc2tzKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgc29ydFRhc2tzKHNlbGY/OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBpZiAoc2VsZilcclxuICAgICAgICAgICAgc2VsZi50YXNrcy5zb3J0KChhOiB0YXNrLCBiOiB0YXNrKSA9PiAoYS5zZXZlcml0eSBhcyBudW1iZXIpIC0gKGIuc2V2ZXJpdHkgYXMgbnVtYmVyKSk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLnRhc2tzLnNvcnQoKGEsIGIpID0+IChhLnNldmVyaXR5IGFzIG51bWJlcikgLSAoYi5zZXZlcml0eSBhcyBudW1iZXIpKTtcclxuICAgIH1cclxuXHJcblxyXG5cdC8vIFBvc3QgcmVxdWVzdCAtIHVwZGF0ZSBBTEwgdGFza3MgaW4gZGIgKHNlbmRpbmcgYWxsIHRhc2tzKVxyXG4gICAgZGJVcGRhdGVBbGwoY2FsbGJhY2s/OiBGdW5jdGlvbikge1xyXG4gICAgICAgIHRoaXMucG9zdCgnL3VwZGF0ZVRhc2tzJywgdGhpcy50YXNrcywgY2FsbGJhY2spO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBQb3N0IHJlcXVlc3QgLSB1cGRhdGUgdGFzayBpbiBkYlxyXG4gICAgZGJVcGRhdGUodGFzazogdGFzaywgY2FsbGJhY2s/OiBGdW5jdGlvbikge1xyXG4gICAgICAgIHRoaXMucG9zdCgnL3VwZGF0ZVRhc2snLCB0YXNrLCBjYWxsYmFjayk7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy50YXNrcy5sZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgaWYgKHRoaXMudGFza3NbaV0uX2lkID09PSB0YXNrLl9pZCkge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiBpbiB0YXNrKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFza3NbaV1bal0gPSB0YXNrW2pdO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLy8gUG9zdCByZXF1ZXN0IC0gaW5zZXJ0IHRhc2sgaW4gZGJcclxuICAgIGRiSW5zZXJ0KHRhc2s6IHRhc2ssIGNhbGxiYWNrPzogRnVuY3Rpb24pIHtcclxuICAgICAgICB0aGlzLnBvc3QoJy9pbnNlcnRUYXNrJyxcclxuICAgICAgICAgICAge3Rhc2s6IHRhc2t9LFxyXG4gICAgICAgICAgICBmdW5jdGlvbihyZXNwb25zZTogYW55KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnSGkhIF5fXicpO1xyXG4gICAgICAgICAgICAgICAgdGFzay5faWQgPSByZXNwb25zZS5qc29uKCkuX2lkO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjaylcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy50YXNrcy5wdXNoKHRhc2spO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBQb3N0IHJlcXVlc3QgLSBkZWxldGUgdGFzayBmcm9tIGRiXHJcbiAgICBkYkRlbGV0ZSh0YXNrOiB0YXNrLCBjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5wb3N0KCcvZGVsZXRlVGFzaycsIHt0YXNrOiB0YXNrfSwgY2FsbGJhY2spO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMudGFza3MubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRhc2tzW2ldLl9pZCA9PT0gdGFzay5faWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGFza3Muc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgIH07XHJcblxyXG5cclxuICAgIC8vIEdldCByZXF1ZXN0IC0gZ2V0IGFsbCB0YXNrcyBmcm9tIGRiICh0byB1cGRhdGUgbG9jYWwgdGFza3MgYXJyYXkpXHJcbiAgICB1cGRhdGVEYXRhRnJvbURCKGNhbGxiYWNrPzogRnVuY3Rpb24pIHtcclxuICAgICAgICB2YXIgaTtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgIHRoaXMuJGh0dHAuZ2V0KCcvZ2V0VGFza3MnKVxyXG4gICAgICAgIC50b1Byb21pc2UoKVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlOiBhbnkpIHtcclxuICAgICAgICAgICAgLy8gMCAtIGRlbC9wdXNoXHJcbiAgICAgICAgICAgIHZhciB0YXNrc1RvRGVsID0gbmV3IEFycmF5KHNlbGYudGFza3MubGVuZ3RoKTtcclxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHNlbGYudGFza3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHRhc2tzVG9EZWxbaV0gPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgdGFza3MgPSByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgICAgIHZhciB0YXNrc1RvUHVzaCA9IG5ldyBBcnJheSh0YXNrcy5sZW5ndGgpO1xyXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgdGFza3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHRhc2tzVG9QdXNoW2ldID0gMDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc2VsZi50YXNrcy5mb3JFYWNoKGZ1bmN0aW9uKHRhc2s6IHRhc2ssIGluZDogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgICAgICB0YXNrcy5mb3JFYWNoKGZ1bmN0aW9uKHJlc3BUYXNrOiB0YXNrLCBqbmQ6IG51bWJlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0YXNrLl9pZCA9PT0gcmVzcFRhc2suX2lkICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhc2suc2V2ZXJpdHkgPT09IHJlc3BUYXNrLnNldmVyaXR5ICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhc2sudGV4dCA9PT0gcmVzcFRhc2sudGV4dCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXNrLmNvbXBsZXRlZCA9PT0gcmVzcFRhc2suY29tcGxldGVkKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBEbyBub3QgcmV3cml0ZSBleGlzdGluZyB0YXNrcyAod2l0aCAxIHZhbHVlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXNrc1RvRGVsW2luZF0gPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXNrc1RvUHVzaFtqbmRdID0gMTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGkgPSB0YXNrc1RvRGVsLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGFza3NUb0RlbFtpXSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYudGFza3Muc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCB0YXNrc1RvUHVzaC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRhc2tzVG9QdXNoW2ldID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi50YXNrcy5wdXNoKHRhc2tzW2ldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaylcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHNlbGYpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmV2ZW50c1NlcnZpY2UuYnJvYWRjYXN0KCdyZXNwb25zZUVycm9yJyk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGR1cmluZyByZXF1ZXN0OiAnLCBlcnJvci5tZXNzYWdlIHx8IGVycm9yKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG5cdHByaXZhdGUgcG9zdChyZXE6IHN0cmluZywgb2JqOiBhbnksIGNhbGxiYWNrPzogRnVuY3Rpb24pIHtcclxuXHRcdHRoaXMuJGh0dHAucG9zdChyZXEsIG9iailcclxuXHRcdC50b1Byb21pc2UoKVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2socmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzU2VydmljZS5icm9hZGNhc3QoJ3Jlc3BvbnNlRXJyb3InKTtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZHVyaW5nIHJlcXVlc3Q6ICcsIGVycm9yLm1lc3NhZ2UgfHwgZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG5cdH1cclxuXHJcbiAgICAvKnByaXZhdGUgaGFuZGxlRXJyb3IoZXJyb3I6IGFueSkgeyAgICAgICAgLy8gJ3RoaXMnIHNvbWVob3cgbGlua3MgdG8gJ3VuZGVmaW5lZCcgaW5zdGVhZCBvZiBjbGFzc1xyXG4gICAgICAgIHRoaXMuZXZlbnRzU2VydmljZS5icm9hZGNhc3QoJ3Jlc3BvbnNlRXJyb3InKTtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBkdXJpbmcgcmVxdWVzdDogJywgZXJyb3IubWVzc2FnZSB8fCBlcnJvcik7XHJcbiAgICB9Ki9cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcENvbXBvbmVudC9zZXJ2aWNlcy90YXNrc01vZGVsLnNlcnZpY2UudHMiLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgdGFza3NNb2RlbFNlcnZpY2UgfSBmcm9tICcuLy4uL3NlcnZpY2VzL3Rhc2tzTW9kZWwuc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuXHRzZWxlY3RvcjogJ2xpc3Qtb3ZlcnZpZXcnLFxyXG5cdHRlbXBsYXRlVXJsOiAnYXBwQ29tcG9uZW50L292ZXJ2aWV3Q29tcG9uZW50L292ZXJ2aWV3LnRlbXBsYXRlLmh0bWwnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBvdmVydmlld0NvbXBvbmVudCB7XHJcbiAgICB0YXNrczogYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHRhc2tzTW9kZWw6IHRhc2tzTW9kZWxTZXJ2aWNlKSB7XHJcbiAgICAgICAgdGhpcy50YXNrcyA9IHRhc2tzTW9kZWwudGFza3M7XHJcbiAgICB9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHBDb21wb25lbnQvb3ZlcnZpZXdDb21wb25lbnQvb3ZlcnZpZXcuY29tcG9uZW50LnRzIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQnJvd3Nlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xyXG5cclxuaW1wb3J0IHsgZWxlbUluT2Jqc0VxdWFsc1RvQ291bnRQaXBlIH0gZnJvbSAnLi9lbGVtSW5PYmpzRXF1YWxzVG9Db3VudC5waXBlJztcclxuaW1wb3J0IHsgaXNVbmlxdWVQaXBlIH0gZnJvbSAnLi9pc1VuaXF1ZS5waXBlJztcclxuaW1wb3J0IHsgb2Jqc1ZhcmlhYmxlRXF1YWxzVG9QaXBlIH0gZnJvbSAnLi9vYmpzVmFyaWFibGVFcXVhbHNUby5waXBlJztcclxuaW1wb3J0IHsgb2Jqc1dpdGhNaW5WYXJpYWJsZVBpcGUgfSBmcm9tICcuL29ianNXaXRoTWluVmFyaWFibGUucGlwZSc7XHJcblxyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtcclxuICAgICAgICBCcm93c2VyTW9kdWxlXHJcbiAgICBdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICAgICAgZWxlbUluT2Jqc0VxdWFsc1RvQ291bnRQaXBlLFxyXG4gICAgICAgIGlzVW5pcXVlUGlwZSxcclxuICAgICAgICBvYmpzVmFyaWFibGVFcXVhbHNUb1BpcGUsXHJcbiAgICAgICAgb2Jqc1dpdGhNaW5WYXJpYWJsZVBpcGVcclxuICAgIF0sXHJcbiAgICBleHBvcnRzOiBbXHJcbiAgICAgICAgZWxlbUluT2Jqc0VxdWFsc1RvQ291bnRQaXBlLFxyXG4gICAgICAgIGlzVW5pcXVlUGlwZSxcclxuICAgICAgICBvYmpzVmFyaWFibGVFcXVhbHNUb1BpcGUsXHJcbiAgICAgICAgb2Jqc1dpdGhNaW5WYXJpYWJsZVBpcGVcclxuICAgIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFBpcGVzTW9kdWxlIHsgfVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcENvbXBvbmVudC9waXBlcy9waXBlcy5tb2R1bGUudHMiLCJpbXBvcnQgeyB0YXNrIH0gZnJvbSAnLi8uLi9pbnRlcmZhY2VzJztcclxuXHJcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyB0YXNrc01vZGVsU2VydmljZSB9IGZyb20gJy4vLi4vc2VydmljZXMvdGFza3NNb2RlbC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRXZlbnRzU2VydmljZSB9IGZyb20gJy4vLi4vc2VydmljZXMvZXZlbnRzLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3Rhc2stbGlzdCcsXHJcbiAgICB0ZW1wbGF0ZVVybDogJ2FwcENvbXBvbmVudC90YXNrTGlzdENvbXBvbmVudC90YXNrTGlzdC50ZW1wbGF0ZS5odG1sJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgdGFza0xpc3RDb21wb25lbnQge1xyXG4gICAgLy8gRm9yIHRoZSB2aWV3IChhbmQgbXkgY29tZm9ydClcclxuICAgIHRhc2tzOiB0YXNrW107XHJcbiAgICB0YXNrc01vZGVsOiBhbnk7XHJcbiAgICAvLyBUZW1wb3Jhcnkgb2JqZWN0IHRoYXQgY2hhbmdpbmcgd2l0aCBuZy1tb2RlbCBvbiBodG1sIGlucHV0XHJcbiAgICB0ZW1wVGFzazogdGFzaztcclxuICAgIC8vIFRhc2sgd2lsbCBiZSBhZGRlZCBhZnRlciBjcmVhdGVUYXNrIGZ1bmN0aW9uXHJcbiAgICB0YXNrVG9DcmVhdGU6IHRhc2s7XHJcbiAgICB0YXNrVG9DcmVhdGVJc0ludmFsaWQ6IGJvb2xlYW47XHJcblxyXG4gICAgY29uc3RydWN0b3IodGFza3NNb2RlbDogdGFza3NNb2RlbFNlcnZpY2UsIGV2ZW50c1NlcnZpY2U6IEV2ZW50c1NlcnZpY2UpIHtcclxuICAgICAgICB0aGlzLnRhc2tzTW9kZWwgPSB0YXNrc01vZGVsO1xyXG4gICAgICAgIHRoaXMudGFza3MgPSB0YXNrc01vZGVsLnRhc2tzO1xyXG5cclxuICAgICAgICAvLyBJbml0aWFsaXplXHJcbiAgICAgICAgdGhpcy50ZW1wVGFzayA9IHtfaWQ6ICcnLCBzZXZlcml0eTogJycsIHRleHQ6ICcnLCBjb21wbGV0ZWQ6IGZhbHNlfTtcclxuICAgICAgICB0aGlzLnRhc2tUb0NyZWF0ZSA9IHtfaWQ6ICcnLCBzZXZlcml0eTogJycsIHRleHQ6ICcnLCBjb21wbGV0ZWQ6IGZhbHNlfTtcclxuICAgICAgICB0aGlzLnRhc2tUb0NyZWF0ZUlzSW52YWxpZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLnRhc2tzTW9kZWwuc29ydFRhc2tzKCk7XHJcblxyXG4gICAgICAgIGV2ZW50c1NlcnZpY2UuYnJvYWRjYXN0KCdwYWdlQ2hhbmdlZCcsIHtuYW1lOiAnTGlzdCBvZiB0YXNrcyd9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8gU3RhcnQgdGFzayBlZGl0aW5nXHJcbiAgICBlZGl0VGFzayh0YXNrOiB0YXNrKTogdm9pZCB7XHJcbiAgICAgICAgdmFyIGk7XHJcblxyXG4gICAgICAgIHRoaXMudGVtcFRhc2tbdGFzay5faWRdID0ge307XHJcbiAgICAgICAgdGhpcy50ZW1wVGFza1t0YXNrLl9pZF0uc2V2ZXJpdHkgPSB0YXNrLnNldmVyaXR5ICsgJyc7XHJcbiAgICAgICAgdGhpcy50ZW1wVGFza1t0YXNrLl9pZF0udGV4dCA9IHRhc2sudGV4dDtcclxuICAgICAgICB0YXNrLmVkaXRpbmcgPSB0cnVlO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBTYXZlIGVkaXRlZCB0YXNrXHJcbiAgICBzYXZlRWRpdFRhc2sodGFzazogdGFzayk6IHZvaWQge1xyXG4gICAgICAgIC8vIENoZWNrIGlmIHRleHQgZmllbGQgaXMgZW1wdHlcclxuICAgICAgICBpZiAodGhpcy50ZW1wVGFza1t0YXNrLl9pZF0udGV4dCA9PT0gJycpIHtcclxuICAgICAgICAgICAgYWxlcnQoJ0VudGVyIHNvbWV0aGluZyBpbiB0YXNrXFwncyB0ZXh0IGZpZWxkIScpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0YXNrLnNldmVyaXR5ID0gK3RoaXMudGVtcFRhc2tbdGFzay5faWRdLnNldmVyaXR5O1xyXG4gICAgICAgIHRhc2sudGV4dCA9IHRoaXMudGVtcFRhc2tbdGFzay5faWRdLnRleHQ7XHJcbiAgICAgICAgdGFzay5lZGl0aW5nID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHRoaXMudGFza3NNb2RlbC5kYlVwZGF0ZSh0YXNrKTtcclxuXHJcbiAgICAgICAgdGhpcy50YXNrc01vZGVsLnNvcnRUYXNrcygpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBTYXZlIGVkaXRlZCB0YXNrXHJcbiAgICAvLyAod2hlbiBwcmVzc2VkIGN0cmwrZW50ZXIgd2hpbGUgaW4gdGV4dGFyZWEgb2YgZWRpdGluZyB0YXNrKVxyXG4gICAgY3RybEVudGVyX1NhdmVFZGl0VGFzayhlOiBLZXlib2FyZEV2ZW50LCB0YXNrOiB0YXNrKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGUuY3RybEtleSAmJiBlLmtleUNvZGUgPT0gMTMpIHtcclxuICAgICAgICAgICAgdGhpcy5zYXZlRWRpdFRhc2sodGFzayk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBDYW5jZWwgdGFzayBlZGl0aW5nXHJcbiAgICBjYW5jZWxFZGl0VGFzayh0YXNrOiB0YXNrKTogdm9pZCB7XHJcbiAgICAgICAgdGFzay5lZGl0aW5nID0gZmFsc2U7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIERlbGV0ZSB0YXNrIChidXR0b24pXHJcbiAgICBkZWxldGVUYXNrKHRhc2s6IHRhc2spOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnRhc2tzTW9kZWwuZGJEZWxldGUodGFzayk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIENoZWNrL3VuY2hlY2sgY29tcGxldGUgY2hlY2tib3hcclxuICAgIGNoYW5nZUNvbXBsZXRlU3RhdGUodGFzazogdGFzayk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudGFza3NNb2RlbC5kYlVwZGF0ZSh0YXNrKTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gQ3JlYXRlIHRhc2sgKGJ5IGZvcm0gYWJvdmUgdGhlIHRhYmxlKVxyXG4gICAgY3JlYXRlVGFzaygpOiB2b2lkIHtcclxuICAgICAgICAvLyBDaGVjayBpZiB0ZXh0IGZpZWxkIGlzIGVtcHR5XHJcbiAgICAgICAgaWYgKCF0aGlzLnRhc2tUb0NyZWF0ZS50ZXh0IHx8ICF0aGlzLnRhc2tUb0NyZWF0ZS5zZXZlcml0eSkge1xyXG4gICAgICAgICAgICB0aGlzLnRhc2tUb0NyZWF0ZUlzSW52YWxpZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudGFza1RvQ3JlYXRlLnNldmVyaXR5ID0gK3RoaXMudGFza1RvQ3JlYXRlLnNldmVyaXR5O1xyXG4gICAgICAgIGlmICghdGhpcy50YXNrVG9DcmVhdGUuc2V2ZXJpdHkpIHtcclxuICAgICAgICAgICAgdGhpcy50YXNrVG9DcmVhdGUuc2V2ZXJpdHkgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRhc2tzTW9kZWwuZGJJbnNlcnQoe1xyXG4gICAgICAgICAgICBzZXZlcml0eTogdGhpcy50YXNrVG9DcmVhdGUuc2V2ZXJpdHksXHJcbiAgICAgICAgICAgIHRleHQ6IHRoaXMudGFza1RvQ3JlYXRlLnRleHQsXHJcbiAgICAgICAgICAgIGNvbXBsZXRlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIGVkaXRpbmc6IGZhbHNlXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMudGFza1RvQ3JlYXRlSXNJbnZhbGlkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy50YXNrVG9DcmVhdGUuc2V2ZXJpdHkgPSAnJztcclxuICAgICAgICB0aGlzLnRhc2tUb0NyZWF0ZS50ZXh0ID0gJyc7XHJcblxyXG4gICAgICAgIHRoaXMudGFza3NNb2RlbC5zb3J0VGFza3MoKTtcclxuICAgIH07XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHBDb21wb25lbnQvdGFza0xpc3RDb21wb25lbnQvdGFza0xpc3QuY29tcG9uZW50LnRzIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xyXG5pbXBvcnQgeyBCcm93c2VyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XHJcblxyXG5pbXBvcnQgeyBhcHBDb21wb25lbnQgfSBmcm9tICcuL2FwcC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBvdmVydmlld01vZHVsZSB9IGZyb20gJy4vb3ZlcnZpZXdDb21wb25lbnQvb3ZlcnZpZXcubW9kdWxlJztcclxuaW1wb3J0IHsgdGFza0xpc3RNb2R1bGUgfSBmcm9tICcuL3Rhc2tMaXN0Q29tcG9uZW50L3Rhc2tMaXN0Lm1vZHVsZSc7XHJcblxyXG5pbXBvcnQgeyB0YXNrc01vZGVsU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvdGFza3NNb2RlbC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRXZlbnRzU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvZXZlbnRzLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBhcHBSb3V0aW5nTW9kdWxlIH0gZnJvbSAnLi9hcHBSb3V0aW5nL2FwcFJvdXRpbmcubW9kdWxlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgQnJvd3Nlck1vZHVsZSxcclxuICAgICAgICBIdHRwTW9kdWxlLFxyXG4gICAgICAgIG92ZXJ2aWV3TW9kdWxlLFxyXG4gICAgICAgIHRhc2tMaXN0TW9kdWxlLFxyXG4gICAgICAgIGFwcFJvdXRpbmdNb2R1bGVcclxuICAgIF0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFsgYXBwQ29tcG9uZW50IF0sXHJcbiAgICBwcm92aWRlcnM6IFsgdGFza3NNb2RlbFNlcnZpY2UsIEV2ZW50c1NlcnZpY2UgXSxcclxuICAgIGJvb3RzdHJhcDogWyBhcHBDb21wb25lbnQgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgYXBwTW9kdWxlIHsgIH1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwQ29tcG9uZW50L2FwcC5tb2R1bGUudHMiLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IHRhc2tzTW9kZWxTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy90YXNrc01vZGVsLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBFdmVudHNTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9ldmVudHMuc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnYXBwJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnYXBwQ29tcG9uZW50L2FwcC50ZW1wbGF0ZS5odG1sJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgYXBwQ29tcG9uZW50IHtcclxuICAgIHRhc2tzTW9kZWw6IHRhc2tzTW9kZWxTZXJ2aWNlO1xyXG5cclxuICAgIHJlc3BvbnNlRXJyb3I6IHtzdGF0ZTogYm9vbGVhbiwgdGltZXI6IGFueX07XHJcbiAgICBodHRwRXJyb3JUZXh0OiBzdHJpbmc7XHJcblxyXG4gICAgbWVudUxpc3QgPSBbXHJcbiAgICAgICAgeyBuYW1lOiAnTWFpbiBwYWdlJywgbGluazogJ21haW5wYWdlJywgYWN0aXZlOiBmYWxzZSB9LFxyXG4gICAgICAgIHsgbmFtZTogJ0xpc3Qgb2YgdGFza3MnLCBsaW5rOiAndGFza2xpc3QnLCBhY3RpdmU6IGZhbHNlIH1cclxuICAgIF07XHJcblxyXG4gICAgY29uc3RydWN0b3IodGFza3NNb2RlbDogdGFza3NNb2RlbFNlcnZpY2UsIGV2ZW50c1NlcnZpY2U6IEV2ZW50c1NlcnZpY2UpIHtcclxuICAgICAgICB0aGlzLnRhc2tzTW9kZWwgPSB0YXNrc01vZGVsO1xyXG4gICAgICAgIHRoaXMucmVzcG9uc2VFcnJvciA9IHsgc3RhdGU6IGZhbHNlLCB0aW1lcjoge30gfTtcclxuXHJcbiAgICAgICAgLy8gV2hlbiBzZWxlY3RlZCBjb21wb25lbnQgaXMgY2hhbmdlZFxyXG4gICAgICAgIGV2ZW50c1NlcnZpY2Uub24oJ3BhZ2VDaGFuZ2VkJywgKGRhdGE6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAvLyBDaG9vc2UgdGhlIGFjdGl2ZSBlbGVtZW50IGluIHRoZSBoZWFkZXIncyBtZW51IGxpc3RcclxuICAgICAgICAgICAgdGhpcy5tZW51TGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGVsZW0pIHtcclxuICAgICAgICAgICAgICAgIGlmIChlbGVtLm5hbWUgPT09IGRhdGEubmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIFdoZW4gc29tZSBlcnJvciBvY2N1cmVkXHJcbiAgICAgICAgZXZlbnRzU2VydmljZS5vbigncmVzcG9uc2VFcnJvcicsIChldmVudDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIC8vIElmIGVycm9yIGVsZW1lbnQgaXMgc2hvd24gLSB1cGRhdGUgaXQncyBhbmltYXRpb25cclxuICAgICAgICAgICAgaWYgKHRoaXMucmVzcG9uc2VFcnJvci5zdGF0ZSA9PSB0cnVlXHJcbiAgICAgICAgICAgICAgICAmJiB0aGlzLnJlc3BvbnNlRXJyb3IudGltZXIpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5yZXNwb25zZUVycm9yLnRpbWVyKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzcG9uc2VFcnJvci5zdGF0ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaHR0cEVycm9yVGV4dCA9ICdSZWNlaXZlZCBhbiBlcnJvciBmcm9tIHRoZSBzZXJ2ZXInO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXNwb25zZUVycm9yLnN0YXRlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzcG9uc2VFcnJvci50aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzcG9uc2VFcnJvci5zdGF0ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSwgNDMwMCk7XHJcbiAgICAgICAgICAgIH0sIDApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICB1cGRhdGVEYXRhKCkge1xyXG4gICAgICAgIHRoaXMudGFza3NNb2RlbC51cGRhdGVEYXRhRnJvbURCKCk7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwQ29tcG9uZW50L2FwcC5jb21wb25lbnQudHMiLCJpbXBvcnQgeyBOZ01vZHVsZSB9ICAgICAgICAgICAgIGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUsIFJvdXRlcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcblxyXG4vLyBJbXBvcnQgY29tcG9uZW50c1xyXG5pbXBvcnQgeyBvdmVydmlld0NvbXBvbmVudCB9IGZyb20gJy4vLi4vb3ZlcnZpZXdDb21wb25lbnQvb3ZlcnZpZXcuY29tcG9uZW50JztcclxuaW1wb3J0IHsgdGFza0xpc3RDb21wb25lbnQgfSBmcm9tICcuLy4uL3Rhc2tMaXN0Q29tcG9uZW50L3Rhc2tMaXN0LmNvbXBvbmVudCc7XHJcblxyXG5jb25zdCByb3V0ZXM6IFJvdXRlcyA9IFtcclxuICAgIHsgcGF0aDonJywgcmVkaXJlY3RUbzogJy9tYWlucGFnZScsIHBhdGhNYXRjaDogJ2Z1bGwnIH0sXHJcbiAgICB7IHBhdGg6J21haW5wYWdlJywgY29tcG9uZW50OiBvdmVydmlld0NvbXBvbmVudCB9LFxyXG4gICAgeyBwYXRoOid0YXNrbGlzdCcsIGNvbXBvbmVudDogdGFza0xpc3RDb21wb25lbnQgfVxyXG5dO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFsgUm91dGVyTW9kdWxlLmZvclJvb3Qocm91dGVzLCB7dXNlSGFzaDogdHJ1ZX0pIF0sXHJcbiAgICBleHBvcnRzOiBbIFJvdXRlck1vZHVsZSBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBhcHBSb3V0aW5nTW9kdWxlIHt9XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcENvbXBvbmVudC9hcHBSb3V0aW5nL2FwcFJvdXRpbmcubW9kdWxlLnRzIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQnJvd3Nlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xyXG5cclxuaW1wb3J0IHsgb3ZlcnZpZXdDb21wb25lbnQgfSBmcm9tICcuL292ZXJ2aWV3LmNvbXBvbmVudCc7XHJcblxyXG5pbXBvcnQgeyBQaXBlc01vZHVsZSB9IGZyb20gJy4vLi4vcGlwZXMvcGlwZXMubW9kdWxlJztcclxuXHJcbmltcG9ydCB7IHRhc2tzTW9kZWxTZXJ2aWNlIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy90YXNrc01vZGVsLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBFdmVudHNTZXJ2aWNlIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy9ldmVudHMuc2VydmljZSc7XHJcblxyXG5cclxuQE5nTW9kdWxlKHtcclxuXHRpbXBvcnRzOiBbXHJcbiAgICAgICAgQnJvd3Nlck1vZHVsZSxcclxuICAgICAgICBQaXBlc01vZHVsZVxyXG4gICAgXSxcclxuXHRkZWNsYXJhdGlvbnM6IFsgb3ZlcnZpZXdDb21wb25lbnQgXSxcclxuICAgIHByb3ZpZGVyczogWyB0YXNrc01vZGVsU2VydmljZSwgRXZlbnRzU2VydmljZSBdLFxyXG4gICAgZXhwb3J0czogWyBvdmVydmlld0NvbXBvbmVudCBdLFxyXG5cdGJvb3RzdHJhcDogWyBvdmVydmlld0NvbXBvbmVudCBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBvdmVydmlld01vZHVsZSB7IH1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHBDb21wb25lbnQvb3ZlcnZpZXdDb21wb25lbnQvb3ZlcnZpZXcubW9kdWxlLnRzIiwiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQFBpcGUoe1xyXG4gICAgbmFtZTogJ2VsZW1Jbk9ianNFcXVhbHNUb0NvdW50JyxcclxuICAgIHB1cmU6IGZhbHNlXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBlbGVtSW5PYmpzRXF1YWxzVG9Db3VudFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuICAgIHRyYW5zZm9ybShjb2xsZWN0aW9uOiBhbnlbXSwga2V5OiBhbnksIHZhbHVlOiBhbnkpOiBudW1iZXIge1xyXG4gICAgICAgIHZhciBjb3VudCA9IDA7XHJcblxyXG4gICAgICAgIGNvbGxlY3Rpb24uZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XHJcbiAgICAgICAgICAgIGlmIChpdGVtW2tleV0gPT09IHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBjb3VudCsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBjb3VudDtcclxuICAgIH1cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcENvbXBvbmVudC9waXBlcy9lbGVtSW5PYmpzRXF1YWxzVG9Db3VudC5waXBlLnRzIiwiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuLy8gRmlsdGVyIHRoYXQgY2hlY2sgaWYgdGhlcmUgaXMgbm8gYW5vdGhlciB2YWx1ZXMgd2l0aCB0aGlzIGtleVxyXG4vLyBpbiB0aGlzIGNvbGxlY3Rpb25cclxuQFBpcGUoe1xyXG4gICAgbmFtZTogJ2lzVW5pcXVlJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgaXNVbmlxdWVQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XHJcbiAgICB0cmFuc2Zvcm0oY29sbGVjdGlvbjogYW55W10sIGtleTogYW55LCB2YWx1ZTogYW55KTogYm9vbGVhbiB7XHJcbiAgICAgICAgdmFyIGNvdW50ID0gMDtcclxuXHJcbiAgICAgICAgY29sbGVjdGlvbi5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcclxuICAgICAgICAgICAgaWYgKGl0ZW1ba2V5XSA9PT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGNvdW50Kys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gMSAtIGl0c2VsZlxyXG4gICAgICAgIHJldHVybiBjb3VudCA+IDEgPyBmYWxzZSA6IHRydWU7XHJcbiAgICB9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHBDb21wb25lbnQvcGlwZXMvaXNVbmlxdWUucGlwZS50cyIsImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbi8vIEZpbHRlciB0aGF0IGNoZWNrIGlmIHRoZXJlIGlzIG5vIGFub3RoZXIgdmFsdWVzIHdpdGggdGhpcyBrZXlcclxuLy8gaW4gdGhpcyBjb2xsZWN0aW9uXHJcbkBQaXBlKHtcclxuICAgIG5hbWU6ICdvYmpzVmFyaWFibGVFcXVhbHNUbycsXHJcbiAgICBwdXJlOiBmYWxzZVxyXG59KVxyXG5leHBvcnQgY2xhc3Mgb2Jqc1ZhcmlhYmxlRXF1YWxzVG9QaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XHJcbiAgICB0cmFuc2Zvcm0oY29sbGVjdGlvbjogYW55W10sIGtleTogYW55LCB2YWx1ZTogYW55KTogYW55W10ge1xyXG5cclxuICAgICAgICB2YXIgcmVzQ29sbDogYW55W10gPSBbXTtcclxuXHJcbiAgICAgICAgY29sbGVjdGlvbi5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcclxuICAgICAgICAgICAgaWYgKGl0ZW1ba2V5XSA9PT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHJlc0NvbGwucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gcmVzQ29sbDtcclxuICAgIH1cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcENvbXBvbmVudC9waXBlcy9vYmpzVmFyaWFibGVFcXVhbHNUby5waXBlLnRzIiwiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQFBpcGUoe1xyXG4gICAgbmFtZTogJ29ianNXaXRoTWluVmFyaWFibGUnLFxyXG4gICAgcHVyZTogZmFsc2VcclxufSlcclxuZXhwb3J0IGNsYXNzIG9ianNXaXRoTWluVmFyaWFibGVQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XHJcbiAgICB0cmFuc2Zvcm0oY29sbGVjdGlvbjogYW55W10sIGtleTogYW55KTogYW55W10ge1xyXG4gICAgICAgIGlmIChjb2xsZWN0aW9uWzBdID09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgcmV0dXJuIGNvbGxlY3Rpb247XHJcblxyXG4gICAgICAgIHZhciBtaW4gPSBjb2xsZWN0aW9uWzBdW2tleV07XHJcbiAgICAgICAgdmFyIGk7XHJcblxyXG4gICAgICAgIGZvciAoaSA9IDE7IGkgPCBjb2xsZWN0aW9uLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChjb2xsZWN0aW9uW2ldW2tleV0gPCBtaW4pIHtcclxuICAgICAgICAgICAgICAgIG1pbiA9IGNvbGxlY3Rpb25baV1ba2V5XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIG9ianMgPSBbXTtcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY29sbGVjdGlvbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoY29sbGVjdGlvbltpXVtrZXldID09PSBtaW4pIHtcclxuICAgICAgICAgICAgICAgIG9ianMucHVzaChjb2xsZWN0aW9uW2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG9ianM7XHJcbiAgICB9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHBDb21wb25lbnQvcGlwZXMvb2Jqc1dpdGhNaW5WYXJpYWJsZS5waXBlLnRzIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQnJvd3Nlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9ICAgZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuaW1wb3J0IHsgdGFza0xpc3RDb21wb25lbnQgfSBmcm9tICcuL3Rhc2tMaXN0LmNvbXBvbmVudCc7XHJcblxyXG5pbXBvcnQgeyBQaXBlc01vZHVsZSB9IGZyb20gJy4vLi4vcGlwZXMvcGlwZXMubW9kdWxlJztcclxuaW1wb3J0IHsgdGFza3NNb2RlbFNlcnZpY2UgfSBmcm9tICcuLy4uL3NlcnZpY2VzL3Rhc2tzTW9kZWwuc2VydmljZSc7XHJcbmltcG9ydCB7IEV2ZW50c1NlcnZpY2UgfSBmcm9tICcuLy4uL3NlcnZpY2VzL2V2ZW50cy5zZXJ2aWNlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgQnJvd3Nlck1vZHVsZSxcclxuICAgICAgICBGb3Jtc01vZHVsZSxcclxuICAgICAgICBQaXBlc01vZHVsZVxyXG4gICAgXSxcclxuICAgIGRlY2xhcmF0aW9uczogWyB0YXNrTGlzdENvbXBvbmVudCBdLFxyXG4gICAgcHJvdmlkZXJzOiBbIHRhc2tzTW9kZWxTZXJ2aWNlLCBFdmVudHNTZXJ2aWNlIF0sXHJcbiAgICBleHBvcnRzOiBbIHRhc2tMaXN0Q29tcG9uZW50IF0sXHJcbiAgICBib290c3RyYXA6IFsgdGFza0xpc3RDb21wb25lbnQgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgdGFza0xpc3RNb2R1bGUgeyB9XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwQ29tcG9uZW50L3Rhc2tMaXN0Q29tcG9uZW50L3Rhc2tMaXN0Lm1vZHVsZS50cyJdLCJzb3VyY2VSb290IjoiIn0=