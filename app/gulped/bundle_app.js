(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
const core_1 = require("@angular/core");
const tasksModel_service_1 = require("./services/tasksModel.service");
const events_service_1 = require("./services/events.service");
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
},{"./services/events.service":11,"./services/tasksModel.service":12,"@angular/core":"@angular/core"}],2:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const http_1 = require("@angular/http");
const platform_browser_1 = require("@angular/platform-browser");
const app_component_1 = require("./app.component");
const overview_module_1 = require("./overviewComponent/overview.module");
const taskList_module_1 = require("./taskListComponent/taskList.module");
const tasksModel_service_1 = require("./services/tasksModel.service");
const events_service_1 = require("./services/events.service");
const appRouting_module_1 = require("./appRouting/appRouting.module");
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
},{"./app.component":1,"./appRouting/appRouting.module":3,"./overviewComponent/overview.module":5,"./services/events.service":11,"./services/tasksModel.service":12,"./taskListComponent/taskList.module":14,"@angular/core":"@angular/core","@angular/http":"@angular/http","@angular/platform-browser":"@angular/platform-browser"}],3:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
// Import components
const overview_component_1 = require("./../overviewComponent/overview.component");
const taskList_component_1 = require("./../taskListComponent/taskList.component");
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
},{"./../overviewComponent/overview.component":4,"./../taskListComponent/taskList.component":13,"@angular/core":"@angular/core","@angular/router":"@angular/router"}],4:[function(require,module,exports){
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
const core_1 = require("@angular/core");
const tasksModel_service_1 = require("./../services/tasksModel.service");
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
},{"./../services/tasksModel.service":12,"@angular/core":"@angular/core"}],5:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const overview_component_1 = require("./overview.component");
const pipes_module_1 = require("./../pipes/pipes.module");
const tasksModel_service_1 = require("./../services/tasksModel.service");
const events_service_1 = require("./../services/events.service");
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
},{"./../pipes/pipes.module":10,"./../services/events.service":11,"./../services/tasksModel.service":12,"./overview.component":4,"@angular/core":"@angular/core","@angular/platform-browser":"@angular/platform-browser"}],6:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
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
},{"@angular/core":"@angular/core"}],7:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
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
},{"@angular/core":"@angular/core"}],8:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
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
},{"@angular/core":"@angular/core"}],9:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
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
},{"@angular/core":"@angular/core"}],10:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const elemInObjsEqualsToCount_pipe_1 = require("./elemInObjsEqualsToCount.pipe");
const isUnique_pipe_1 = require("./isUnique.pipe");
const objsVariableEqualsTo_pipe_1 = require("./objsVariableEqualsTo.pipe");
const objsWithMinVariable_pipe_1 = require("./objsWithMinVariable.pipe");
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
},{"./elemInObjsEqualsToCount.pipe":6,"./isUnique.pipe":7,"./objsVariableEqualsTo.pipe":8,"./objsWithMinVariable.pipe":9,"@angular/core":"@angular/core","@angular/platform-browser":"@angular/platform-browser"}],11:[function(require,module,exports){
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
const core_1 = require("@angular/core");
const Rx = require("rxjs/Rx");
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
},{"@angular/core":"@angular/core","rxjs/Rx":"rxjs/Rx"}],12:[function(require,module,exports){
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
const core_1 = require("@angular/core");
const http_1 = require("@angular/http");
const events_service_1 = require("./../services/events.service");
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
            task._id = response.data._id;
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
},{"./../services/events.service":11,"@angular/core":"@angular/core","@angular/http":"@angular/http"}],13:[function(require,module,exports){
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
const core_1 = require("@angular/core");
const tasksModel_service_1 = require("./../services/tasksModel.service");
const events_service_1 = require("./../services/events.service");
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
},{"./../services/events.service":11,"./../services/tasksModel.service":12,"@angular/core":"@angular/core"}],14:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const forms_1 = require("@angular/forms");
const taskList_component_1 = require("./taskList.component");
const pipes_module_1 = require("./../pipes/pipes.module");
const tasksModel_service_1 = require("./../services/tasksModel.service");
const events_service_1 = require("./../services/events.service");
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
},{"./../pipes/pipes.module":10,"./../services/events.service":11,"./../services/tasksModel.service":12,"./taskList.component":13,"@angular/core":"@angular/core","@angular/forms":"@angular/forms","@angular/platform-browser":"@angular/platform-browser"}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
require("rxjs/add/operator/toPromise");
const app_module_1 = require("./appComponent/app.module");
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.appModule);
},{"./appComponent/app.module":2,"@angular/platform-browser-dynamic":"@angular/platform-browser-dynamic","rxjs/add/operator/toPromise":20}],16:[function(require,module,exports){
"use strict";
var root_1 = require('./util/root');
var toSubscriber_1 = require('./util/toSubscriber');
var observable_1 = require('./symbol/observable');
/**
 * A representation of any set of values over any amount of time. This the most basic building block
 * of RxJS.
 *
 * @class Observable<T>
 */
var Observable = (function () {
    /**
     * @constructor
     * @param {Function} subscribe the function that is  called when the Observable is
     * initially subscribed to. This function is given a Subscriber, to which new values
     * can be `next`ed, or an `error` method can be called to raise an error, or
     * `complete` can be called to notify of a successful completion.
     */
    function Observable(subscribe) {
        this._isScalar = false;
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }
    /**
     * Creates a new Observable, with this Observable as the source, and the passed
     * operator defined as the new observable's operator.
     * @method lift
     * @param {Operator} operator the operator defining the operation to take on the observable
     * @return {Observable} a new observable with the Operator applied
     */
    Observable.prototype.lift = function (operator) {
        var observable = new Observable();
        observable.source = this;
        observable.operator = operator;
        return observable;
    };
    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
        var operator = this.operator;
        var sink = toSubscriber_1.toSubscriber(observerOrNext, error, complete);
        if (operator) {
            operator.call(sink, this.source);
        }
        else {
            sink.add(this._subscribe(sink));
        }
        if (sink.syncErrorThrowable) {
            sink.syncErrorThrowable = false;
            if (sink.syncErrorThrown) {
                throw sink.syncErrorValue;
            }
        }
        return sink;
    };
    /**
     * @method forEach
     * @param {Function} next a handler for each value emitted by the observable
     * @param {PromiseConstructor} [PromiseCtor] a constructor function used to instantiate the Promise
     * @return {Promise} a promise that either resolves on observable completion or
     *  rejects with the handled error
     */
    Observable.prototype.forEach = function (next, PromiseCtor) {
        var _this = this;
        if (!PromiseCtor) {
            if (root_1.root.Rx && root_1.root.Rx.config && root_1.root.Rx.config.Promise) {
                PromiseCtor = root_1.root.Rx.config.Promise;
            }
            else if (root_1.root.Promise) {
                PromiseCtor = root_1.root.Promise;
            }
        }
        if (!PromiseCtor) {
            throw new Error('no Promise impl found');
        }
        return new PromiseCtor(function (resolve, reject) {
            var subscription = _this.subscribe(function (value) {
                if (subscription) {
                    // if there is a subscription, then we can surmise
                    // the next handling is asynchronous. Any errors thrown
                    // need to be rejected explicitly and unsubscribe must be
                    // called manually
                    try {
                        next(value);
                    }
                    catch (err) {
                        reject(err);
                        subscription.unsubscribe();
                    }
                }
                else {
                    // if there is NO subscription, then we're getting a nexted
                    // value synchronously during subscription. We can just call it.
                    // If it errors, Observable's `subscribe` will ensure the
                    // unsubscription logic is called, then synchronously rethrow the error.
                    // After that, Promise will trap the error and send it
                    // down the rejection path.
                    next(value);
                }
            }, reject, resolve);
        });
    };
    Observable.prototype._subscribe = function (subscriber) {
        return this.source.subscribe(subscriber);
    };
    /**
     * An interop point defined by the es7-observable spec https://github.com/zenparsing/es-observable
     * @method Symbol.observable
     * @return {Observable} this instance of the observable
     */
    Observable.prototype[observable_1.$$observable] = function () {
        return this;
    };
    // HACK: Since TypeScript inherits static properties too, we have to
    // fight against TypeScript here so Subject can have a different static create signature
    /**
     * Creates a new cold Observable by calling the Observable constructor
     * @static true
     * @owner Observable
     * @method create
     * @param {Function} subscribe? the subscriber function to be passed to the Observable constructor
     * @return {Observable} a new cold observable
     */
    Observable.create = function (subscribe) {
        return new Observable(subscribe);
    };
    return Observable;
}());
exports.Observable = Observable;

},{"./symbol/observable":22,"./util/root":29,"./util/toSubscriber":30}],17:[function(require,module,exports){
"use strict";
exports.empty = {
    closed: true,
    next: function (value) { },
    error: function (err) { throw err; },
    complete: function () { }
};

},{}],18:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var isFunction_1 = require('./util/isFunction');
var Subscription_1 = require('./Subscription');
var Observer_1 = require('./Observer');
var rxSubscriber_1 = require('./symbol/rxSubscriber');
/**
 * Implements the {@link Observer} interface and extends the
 * {@link Subscription} class. While the {@link Observer} is the public API for
 * consuming the values of an {@link Observable}, all Observers get converted to
 * a Subscriber, in order to provide Subscription-like capabilities such as
 * `unsubscribe`. Subscriber is a common type in RxJS, and crucial for
 * implementing operators, but it is rarely used as a public API.
 *
 * @class Subscriber<T>
 */
var Subscriber = (function (_super) {
    __extends(Subscriber, _super);
    /**
     * @param {Observer|function(value: T): void} [destinationOrNext] A partially
     * defined Observer or a `next` callback function.
     * @param {function(e: ?any): void} [error] The `error` callback of an
     * Observer.
     * @param {function(): void} [complete] The `complete` callback of an
     * Observer.
     */
    function Subscriber(destinationOrNext, error, complete) {
        _super.call(this);
        this.syncErrorValue = null;
        this.syncErrorThrown = false;
        this.syncErrorThrowable = false;
        this.isStopped = false;
        switch (arguments.length) {
            case 0:
                this.destination = Observer_1.empty;
                break;
            case 1:
                if (!destinationOrNext) {
                    this.destination = Observer_1.empty;
                    break;
                }
                if (typeof destinationOrNext === 'object') {
                    if (destinationOrNext instanceof Subscriber) {
                        this.destination = destinationOrNext;
                        this.destination.add(this);
                    }
                    else {
                        this.syncErrorThrowable = true;
                        this.destination = new SafeSubscriber(this, destinationOrNext);
                    }
                    break;
                }
            default:
                this.syncErrorThrowable = true;
                this.destination = new SafeSubscriber(this, destinationOrNext, error, complete);
                break;
        }
    }
    Subscriber.prototype[rxSubscriber_1.$$rxSubscriber] = function () { return this; };
    /**
     * A static factory for a Subscriber, given a (potentially partial) definition
     * of an Observer.
     * @param {function(x: ?T): void} [next] The `next` callback of an Observer.
     * @param {function(e: ?any): void} [error] The `error` callback of an
     * Observer.
     * @param {function(): void} [complete] The `complete` callback of an
     * Observer.
     * @return {Subscriber<T>} A Subscriber wrapping the (partially defined)
     * Observer represented by the given arguments.
     */
    Subscriber.create = function (next, error, complete) {
        var subscriber = new Subscriber(next, error, complete);
        subscriber.syncErrorThrowable = false;
        return subscriber;
    };
    /**
     * The {@link Observer} callback to receive notifications of type `next` from
     * the Observable, with a value. The Observable may call this method 0 or more
     * times.
     * @param {T} [value] The `next` value.
     * @return {void}
     */
    Subscriber.prototype.next = function (value) {
        if (!this.isStopped) {
            this._next(value);
        }
    };
    /**
     * The {@link Observer} callback to receive notifications of type `error` from
     * the Observable, with an attached {@link Error}. Notifies the Observer that
     * the Observable has experienced an error condition.
     * @param {any} [err] The `error` exception.
     * @return {void}
     */
    Subscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            this.isStopped = true;
            this._error(err);
        }
    };
    /**
     * The {@link Observer} callback to receive a valueless notification of type
     * `complete` from the Observable. Notifies the Observer that the Observable
     * has finished sending push-based notifications.
     * @return {void}
     */
    Subscriber.prototype.complete = function () {
        if (!this.isStopped) {
            this.isStopped = true;
            this._complete();
        }
    };
    Subscriber.prototype.unsubscribe = function () {
        if (this.closed) {
            return;
        }
        this.isStopped = true;
        _super.prototype.unsubscribe.call(this);
    };
    Subscriber.prototype._next = function (value) {
        this.destination.next(value);
    };
    Subscriber.prototype._error = function (err) {
        this.destination.error(err);
        this.unsubscribe();
    };
    Subscriber.prototype._complete = function () {
        this.destination.complete();
        this.unsubscribe();
    };
    return Subscriber;
}(Subscription_1.Subscription));
exports.Subscriber = Subscriber;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SafeSubscriber = (function (_super) {
    __extends(SafeSubscriber, _super);
    function SafeSubscriber(_parent, observerOrNext, error, complete) {
        _super.call(this);
        this._parent = _parent;
        var next;
        var context = this;
        if (isFunction_1.isFunction(observerOrNext)) {
            next = observerOrNext;
        }
        else if (observerOrNext) {
            context = observerOrNext;
            next = observerOrNext.next;
            error = observerOrNext.error;
            complete = observerOrNext.complete;
            if (isFunction_1.isFunction(context.unsubscribe)) {
                this.add(context.unsubscribe.bind(context));
            }
            context.unsubscribe = this.unsubscribe.bind(this);
        }
        this._context = context;
        this._next = next;
        this._error = error;
        this._complete = complete;
    }
    SafeSubscriber.prototype.next = function (value) {
        if (!this.isStopped && this._next) {
            var _parent = this._parent;
            if (!_parent.syncErrorThrowable) {
                this.__tryOrUnsub(this._next, value);
            }
            else if (this.__tryOrSetError(_parent, this._next, value)) {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            var _parent = this._parent;
            if (this._error) {
                if (!_parent.syncErrorThrowable) {
                    this.__tryOrUnsub(this._error, err);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parent, this._error, err);
                    this.unsubscribe();
                }
            }
            else if (!_parent.syncErrorThrowable) {
                this.unsubscribe();
                throw err;
            }
            else {
                _parent.syncErrorValue = err;
                _parent.syncErrorThrown = true;
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.complete = function () {
        if (!this.isStopped) {
            var _parent = this._parent;
            if (this._complete) {
                if (!_parent.syncErrorThrowable) {
                    this.__tryOrUnsub(this._complete);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parent, this._complete);
                    this.unsubscribe();
                }
            }
            else {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.__tryOrUnsub = function (fn, value) {
        try {
            fn.call(this._context, value);
        }
        catch (err) {
            this.unsubscribe();
            throw err;
        }
    };
    SafeSubscriber.prototype.__tryOrSetError = function (parent, fn, value) {
        try {
            fn.call(this._context, value);
        }
        catch (err) {
            parent.syncErrorValue = err;
            parent.syncErrorThrown = true;
            return true;
        }
        return false;
    };
    SafeSubscriber.prototype._unsubscribe = function () {
        var _parent = this._parent;
        this._context = null;
        this._parent = null;
        _parent.unsubscribe();
    };
    return SafeSubscriber;
}(Subscriber));

},{"./Observer":17,"./Subscription":19,"./symbol/rxSubscriber":23,"./util/isFunction":27}],19:[function(require,module,exports){
"use strict";
var isArray_1 = require('./util/isArray');
var isObject_1 = require('./util/isObject');
var isFunction_1 = require('./util/isFunction');
var tryCatch_1 = require('./util/tryCatch');
var errorObject_1 = require('./util/errorObject');
var UnsubscriptionError_1 = require('./util/UnsubscriptionError');
/**
 * Represents a disposable resource, such as the execution of an Observable. A
 * Subscription has one important method, `unsubscribe`, that takes no argument
 * and just disposes the resource held by the subscription.
 *
 * Additionally, subscriptions may be grouped together through the `add()`
 * method, which will attach a child Subscription to the current Subscription.
 * When a Subscription is unsubscribed, all its children (and its grandchildren)
 * will be unsubscribed as well.
 *
 * @class Subscription
 */
var Subscription = (function () {
    /**
     * @param {function(): void} [unsubscribe] A function describing how to
     * perform the disposal of resources when the `unsubscribe` method is called.
     */
    function Subscription(unsubscribe) {
        /**
         * A flag to indicate whether this Subscription has already been unsubscribed.
         * @type {boolean}
         */
        this.closed = false;
        if (unsubscribe) {
            this._unsubscribe = unsubscribe;
        }
    }
    /**
     * Disposes the resources held by the subscription. May, for instance, cancel
     * an ongoing Observable execution or cancel any other type of work that
     * started when the Subscription was created.
     * @return {void}
     */
    Subscription.prototype.unsubscribe = function () {
        var hasErrors = false;
        var errors;
        if (this.closed) {
            return;
        }
        this.closed = true;
        var _a = this, _unsubscribe = _a._unsubscribe, _subscriptions = _a._subscriptions;
        this._subscriptions = null;
        if (isFunction_1.isFunction(_unsubscribe)) {
            var trial = tryCatch_1.tryCatch(_unsubscribe).call(this);
            if (trial === errorObject_1.errorObject) {
                hasErrors = true;
                (errors = errors || []).push(errorObject_1.errorObject.e);
            }
        }
        if (isArray_1.isArray(_subscriptions)) {
            var index = -1;
            var len = _subscriptions.length;
            while (++index < len) {
                var sub = _subscriptions[index];
                if (isObject_1.isObject(sub)) {
                    var trial = tryCatch_1.tryCatch(sub.unsubscribe).call(sub);
                    if (trial === errorObject_1.errorObject) {
                        hasErrors = true;
                        errors = errors || [];
                        var err = errorObject_1.errorObject.e;
                        if (err instanceof UnsubscriptionError_1.UnsubscriptionError) {
                            errors = errors.concat(err.errors);
                        }
                        else {
                            errors.push(err);
                        }
                    }
                }
            }
        }
        if (hasErrors) {
            throw new UnsubscriptionError_1.UnsubscriptionError(errors);
        }
    };
    /**
     * Adds a tear down to be called during the unsubscribe() of this
     * Subscription.
     *
     * If the tear down being added is a subscription that is already
     * unsubscribed, is the same reference `add` is being called on, or is
     * `Subscription.EMPTY`, it will not be added.
     *
     * If this subscription is already in an `closed` state, the passed
     * tear down logic will be executed immediately.
     *
     * @param {TeardownLogic} teardown The additional logic to execute on
     * teardown.
     * @return {Subscription} Returns the Subscription used or created to be
     * added to the inner subscriptions list. This Subscription can be used with
     * `remove()` to remove the passed teardown logic from the inner subscriptions
     * list.
     */
    Subscription.prototype.add = function (teardown) {
        if (!teardown || (teardown === Subscription.EMPTY)) {
            return Subscription.EMPTY;
        }
        if (teardown === this) {
            return this;
        }
        var sub = teardown;
        switch (typeof teardown) {
            case 'function':
                sub = new Subscription(teardown);
            case 'object':
                if (sub.closed || typeof sub.unsubscribe !== 'function') {
                    break;
                }
                else if (this.closed) {
                    sub.unsubscribe();
                }
                else {
                    (this._subscriptions || (this._subscriptions = [])).push(sub);
                }
                break;
            default:
                throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
        }
        return sub;
    };
    /**
     * Removes a Subscription from the internal list of subscriptions that will
     * unsubscribe during the unsubscribe process of this Subscription.
     * @param {Subscription} subscription The subscription to remove.
     * @return {void}
     */
    Subscription.prototype.remove = function (subscription) {
        // HACK: This might be redundant because of the logic in `add()`
        if (subscription == null || (subscription === this) || (subscription === Subscription.EMPTY)) {
            return;
        }
        var subscriptions = this._subscriptions;
        if (subscriptions) {
            var subscriptionIndex = subscriptions.indexOf(subscription);
            if (subscriptionIndex !== -1) {
                subscriptions.splice(subscriptionIndex, 1);
            }
        }
    };
    Subscription.EMPTY = (function (empty) {
        empty.closed = true;
        return empty;
    }(new Subscription()));
    return Subscription;
}());
exports.Subscription = Subscription;

},{"./util/UnsubscriptionError":24,"./util/errorObject":25,"./util/isArray":26,"./util/isFunction":27,"./util/isObject":28,"./util/tryCatch":31}],20:[function(require,module,exports){
"use strict";
var Observable_1 = require('../../Observable');
var toPromise_1 = require('../../operator/toPromise');
Observable_1.Observable.prototype.toPromise = toPromise_1.toPromise;

},{"../../Observable":16,"../../operator/toPromise":21}],21:[function(require,module,exports){
"use strict";
var root_1 = require('../util/root');
/* tslint:disable:max-line-length */
/**
 * @param PromiseCtor
 * @return {Promise<T>}
 * @method toPromise
 * @owner Observable
 */
function toPromise(PromiseCtor) {
    var _this = this;
    if (!PromiseCtor) {
        if (root_1.root.Rx && root_1.root.Rx.config && root_1.root.Rx.config.Promise) {
            PromiseCtor = root_1.root.Rx.config.Promise;
        }
        else if (root_1.root.Promise) {
            PromiseCtor = root_1.root.Promise;
        }
    }
    if (!PromiseCtor) {
        throw new Error('no Promise impl found');
    }
    return new PromiseCtor(function (resolve, reject) {
        var value;
        _this.subscribe(function (x) { return value = x; }, function (err) { return reject(err); }, function () { return resolve(value); });
    });
}
exports.toPromise = toPromise;

},{"../util/root":29}],22:[function(require,module,exports){
"use strict";
var root_1 = require('../util/root');
function getSymbolObservable(context) {
    var $$observable;
    var Symbol = context.Symbol;
    if (typeof Symbol === 'function') {
        if (Symbol.observable) {
            $$observable = Symbol.observable;
        }
        else {
            $$observable = Symbol('observable');
            Symbol.observable = $$observable;
        }
    }
    else {
        $$observable = '@@observable';
    }
    return $$observable;
}
exports.getSymbolObservable = getSymbolObservable;
exports.$$observable = getSymbolObservable(root_1.root);

},{"../util/root":29}],23:[function(require,module,exports){
"use strict";
var root_1 = require('../util/root');
var Symbol = root_1.root.Symbol;
exports.$$rxSubscriber = (typeof Symbol === 'function' && typeof Symbol.for === 'function') ?
    Symbol.for('rxSubscriber') : '@@rxSubscriber';

},{"../util/root":29}],24:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * An error thrown when one or more errors have occurred during the
 * `unsubscribe` of a {@link Subscription}.
 */
var UnsubscriptionError = (function (_super) {
    __extends(UnsubscriptionError, _super);
    function UnsubscriptionError(errors) {
        _super.call(this);
        this.errors = errors;
        var err = Error.call(this, errors ?
            errors.length + " errors occurred during unsubscription:\n  " + errors.map(function (err, i) { return ((i + 1) + ") " + err.toString()); }).join('\n  ') : '');
        this.name = err.name = 'UnsubscriptionError';
        this.stack = err.stack;
        this.message = err.message;
    }
    return UnsubscriptionError;
}(Error));
exports.UnsubscriptionError = UnsubscriptionError;

},{}],25:[function(require,module,exports){
"use strict";
// typeof any so that it we don't have to cast when comparing a result to the error object
exports.errorObject = { e: {} };

},{}],26:[function(require,module,exports){
"use strict";
exports.isArray = Array.isArray || (function (x) { return x && typeof x.length === 'number'; });

},{}],27:[function(require,module,exports){
"use strict";
function isFunction(x) {
    return typeof x === 'function';
}
exports.isFunction = isFunction;

},{}],28:[function(require,module,exports){
"use strict";
function isObject(x) {
    return x != null && typeof x === 'object';
}
exports.isObject = isObject;

},{}],29:[function(require,module,exports){
(function (global){
"use strict";
/**
 * window: browser in DOM main thread
 * self: browser in WebWorker
 * global: Node.js/other
 */
exports.root = (typeof window == 'object' && window.window === window && window
    || typeof self == 'object' && self.self === self && self
    || typeof global == 'object' && global.global === global && global);
if (!exports.root) {
    throw new Error('RxJS could not find any global context (window, self, global)');
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],30:[function(require,module,exports){
"use strict";
var Subscriber_1 = require('../Subscriber');
var rxSubscriber_1 = require('../symbol/rxSubscriber');
var Observer_1 = require('../Observer');
function toSubscriber(nextOrObserver, error, complete) {
    if (nextOrObserver) {
        if (nextOrObserver instanceof Subscriber_1.Subscriber) {
            return nextOrObserver;
        }
        if (nextOrObserver[rxSubscriber_1.$$rxSubscriber]) {
            return nextOrObserver[rxSubscriber_1.$$rxSubscriber]();
        }
    }
    if (!nextOrObserver && !error && !complete) {
        return new Subscriber_1.Subscriber(Observer_1.empty);
    }
    return new Subscriber_1.Subscriber(nextOrObserver, error, complete);
}
exports.toSubscriber = toSubscriber;

},{"../Observer":17,"../Subscriber":18,"../symbol/rxSubscriber":23}],31:[function(require,module,exports){
"use strict";
var errorObject_1 = require('./errorObject');
var tryCatchTarget;
function tryCatcher() {
    try {
        return tryCatchTarget.apply(this, arguments);
    }
    catch (e) {
        errorObject_1.errorObject.e = e;
        return errorObject_1.errorObject;
    }
}
function tryCatch(fn) {
    tryCatchTarget = fn;
    return tryCatcher;
}
exports.tryCatch = tryCatch;
;

},{"./errorObject":25}]},{},[15])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9hcHAvYXBwQ29tcG9uZW50L2FwcC5jb21wb25lbnQudHMiLCIuLi9hcHAvYXBwQ29tcG9uZW50L2FwcC5tb2R1bGUudHMiLCIuLi9hcHAvYXBwQ29tcG9uZW50L2FwcFJvdXRpbmcvYXBwUm91dGluZy5tb2R1bGUudHMiLCIuLi9hcHAvYXBwQ29tcG9uZW50L292ZXJ2aWV3Q29tcG9uZW50L292ZXJ2aWV3LmNvbXBvbmVudC50cyIsIi4uL2FwcC9hcHBDb21wb25lbnQvb3ZlcnZpZXdDb21wb25lbnQvb3ZlcnZpZXcubW9kdWxlLnRzIiwiLi4vYXBwL2FwcENvbXBvbmVudC9waXBlcy9lbGVtSW5PYmpzRXF1YWxzVG9Db3VudC5waXBlLnRzIiwiLi4vYXBwL2FwcENvbXBvbmVudC9waXBlcy9pc1VuaXF1ZS5waXBlLnRzIiwiLi4vYXBwL2FwcENvbXBvbmVudC9waXBlcy9vYmpzVmFyaWFibGVFcXVhbHNUby5waXBlLnRzIiwiLi4vYXBwL2FwcENvbXBvbmVudC9waXBlcy9vYmpzV2l0aE1pblZhcmlhYmxlLnBpcGUudHMiLCIuLi9hcHAvYXBwQ29tcG9uZW50L3BpcGVzL3BpcGVzLm1vZHVsZS50cyIsIi4uL2FwcC9hcHBDb21wb25lbnQvc2VydmljZXMvZXZlbnRzLnNlcnZpY2UudHMiLCIuLi9hcHAvYXBwQ29tcG9uZW50L3NlcnZpY2VzL3Rhc2tzTW9kZWwuc2VydmljZS50cyIsIi4uL2FwcC9hcHBDb21wb25lbnQvdGFza0xpc3RDb21wb25lbnQvdGFza0xpc3QuY29tcG9uZW50LnRzIiwiLi4vYXBwL2FwcENvbXBvbmVudC90YXNrTGlzdENvbXBvbmVudC90YXNrTGlzdC5tb2R1bGUudHMiLCIuLi9hcHAvYm9vdHN0cmFwLnRzIiwiLi4vbm9kZV9tb2R1bGVzL3J4anMvT2JzZXJ2YWJsZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9yeGpzL09ic2VydmVyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3J4anMvU3Vic2NyaWJlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9yeGpzL1N1YnNjcmlwdGlvbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9yeGpzL2FkZC9vcGVyYXRvci90b1Byb21pc2UuanMiLCIuLi9ub2RlX21vZHVsZXMvcnhqcy9vcGVyYXRvci90b1Byb21pc2UuanMiLCIuLi9ub2RlX21vZHVsZXMvcnhqcy9zeW1ib2wvb2JzZXJ2YWJsZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9yeGpzL3N5bWJvbC9yeFN1YnNjcmliZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvcnhqcy91dGlsL1Vuc3Vic2NyaXB0aW9uRXJyb3IuanMiLCIuLi9ub2RlX21vZHVsZXMvcnhqcy91dGlsL2Vycm9yT2JqZWN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3J4anMvdXRpbC9pc0FycmF5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3J4anMvdXRpbC9pc0Z1bmN0aW9uLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3J4anMvdXRpbC9pc09iamVjdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9yeGpzL3V0aWwvcm9vdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9yeGpzL3V0aWwvdG9TdWJzY3JpYmVyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3J4anMvdXRpbC90cnlDYXRjaC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7O0FDQUEsd0NBQTBDO0FBRTFDLHNFQUFrRTtBQUNsRSw4REFBMEQ7QUFNMUQsSUFBYSxZQUFZLEdBQXpCO0lBV0ksWUFBWSxVQUE2QixFQUFFLGFBQTRCO1FBTHZFLGFBQVEsR0FBRztZQUNQLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7WUFDdEQsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtTQUM3RCxDQUFDO1FBR0UsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDN0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxDQUFDO1FBRWpELHFDQUFxQztRQUNyQyxhQUFhLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxDQUFDLElBQVM7WUFDdEMsc0RBQXNEO1lBQ3RELElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQVMsSUFBSTtnQkFDL0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDMUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7Z0JBQ3ZCLENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ0osSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7Z0JBQ3hCLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO1FBRUgsMEJBQTBCO1FBQzFCLGFBQWEsQ0FBQyxFQUFFLENBQUMsZUFBZSxFQUFFLENBQUMsS0FBVTtZQUN6QyxvREFBb0Q7WUFDcEQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLElBQUksSUFBSTttQkFDN0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUU5QixZQUFZLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDdkMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ3JDLENBQUM7WUFFRCxVQUFVLENBQUM7Z0JBQ1AsSUFBSSxDQUFDLGFBQWEsR0FBRyxtQ0FBbUMsQ0FBQztnQkFDekQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO2dCQUNoQyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUM7b0JBQ2xDLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztnQkFDckMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ2IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ1YsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBR0QsVUFBVTtRQUNOLElBQUksQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0NBQ0osQ0FBQTtBQW5EWSxZQUFZO0lBSnhCLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsS0FBSztRQUNmLFdBQVcsRUFBRSxnQ0FBZ0M7S0FDaEQsQ0FBQztxQ0FZMEIsc0NBQWlCLEVBQWlCLDhCQUFhO0dBWDlELFlBQVksQ0FtRHhCO0FBbkRZLG9DQUFZOzs7Ozs7Ozs7O0FDVHpCLHdDQUF5QztBQUN6Qyx3Q0FBMkM7QUFDM0MsZ0VBQTBEO0FBRTFELG1EQUErQztBQUMvQyx5RUFBcUU7QUFDckUseUVBQXFFO0FBRXJFLHNFQUFrRTtBQUNsRSw4REFBMEQ7QUFDMUQsc0VBQWtFO0FBY2xFLElBQWEsU0FBUyxHQUF0QjtDQUEyQixDQUFBO0FBQWQsU0FBUztJQVpyQixlQUFRLENBQUM7UUFDTixPQUFPLEVBQUU7WUFDTCxnQ0FBYTtZQUNiLGlCQUFVO1lBQ1YsZ0NBQWM7WUFDZCxnQ0FBYztZQUNkLG9DQUFnQjtTQUNuQjtRQUNELFlBQVksRUFBRSxDQUFFLDRCQUFZLENBQUU7UUFDOUIsU0FBUyxFQUFFLENBQUUsc0NBQWlCLEVBQUUsOEJBQWEsQ0FBRTtRQUMvQyxTQUFTLEVBQUUsQ0FBRSw0QkFBWSxDQUFFO0tBQzlCLENBQUM7R0FDVyxTQUFTLENBQUs7QUFBZCw4QkFBUzs7Ozs7Ozs7OztBQ3hCdEIsd0NBQXFEO0FBQ3JELDRDQUF1RDtBQUV2RCxvQkFBb0I7QUFDcEIsa0ZBQThFO0FBQzlFLGtGQUE4RTtBQUU5RSxNQUFNLE1BQU0sR0FBVztJQUNuQixFQUFFLElBQUksRUFBQyxFQUFFLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFO0lBQ3ZELEVBQUUsSUFBSSxFQUFDLFVBQVUsRUFBRSxTQUFTLEVBQUUsc0NBQWlCLEVBQUU7SUFDakQsRUFBRSxJQUFJLEVBQUMsVUFBVSxFQUFFLFNBQVMsRUFBRSxzQ0FBaUIsRUFBRTtDQUNwRCxDQUFDO0FBTUYsSUFBYSxnQkFBZ0IsR0FBN0I7Q0FBZ0MsQ0FBQTtBQUFuQixnQkFBZ0I7SUFKNUIsZUFBUSxDQUFDO1FBQ04sT0FBTyxFQUFFLENBQUUscUJBQVksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUMsT0FBTyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUU7UUFDMUQsT0FBTyxFQUFFLENBQUUscUJBQVksQ0FBRTtLQUM1QixDQUFDO0dBQ1csZ0JBQWdCLENBQUc7QUFBbkIsNENBQWdCOzs7Ozs7Ozs7Ozs7O0FDakI3Qix3Q0FBMEM7QUFDMUMseUVBQXFFO0FBTXJFLElBQWEsaUJBQWlCLEdBQTlCO0lBR0ksWUFBWSxVQUE2QjtRQUNyQyxJQUFJLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUM7SUFDbEMsQ0FBQztDQUNKLENBQUE7QUFOWSxpQkFBaUI7SUFKN0IsZ0JBQVMsQ0FBQztRQUNWLFFBQVEsRUFBRSxlQUFlO1FBQ3pCLFdBQVcsRUFBRSx1REFBdUQ7S0FDcEUsQ0FBQztxQ0FJMEIsc0NBQWlCO0dBSGhDLGlCQUFpQixDQU03QjtBQU5ZLDhDQUFpQjs7Ozs7Ozs7OztBQ1A5Qix3Q0FBeUM7QUFDekMsZ0VBQTBEO0FBRTFELDZEQUF5RDtBQUV6RCwwREFBc0Q7QUFFdEQseUVBQXFFO0FBQ3JFLGlFQUE2RDtBQWE3RCxJQUFhLGNBQWMsR0FBM0I7Q0FBK0IsQ0FBQTtBQUFsQixjQUFjO0lBVjFCLGVBQVEsQ0FBQztRQUNULE9BQU8sRUFBRTtZQUNGLGdDQUFhO1lBQ2IsMEJBQVc7U0FDZDtRQUNKLFlBQVksRUFBRSxDQUFFLHNDQUFpQixDQUFFO1FBQ2hDLFNBQVMsRUFBRSxDQUFFLHNDQUFpQixFQUFFLDhCQUFhLENBQUU7UUFDL0MsT0FBTyxFQUFFLENBQUUsc0NBQWlCLENBQUU7UUFDakMsU0FBUyxFQUFFLENBQUUsc0NBQWlCLENBQUU7S0FDaEMsQ0FBQztHQUNXLGNBQWMsQ0FBSTtBQUFsQix3Q0FBYzs7Ozs7Ozs7OztBQ3JCM0Isd0NBQW9EO0FBTXBELElBQWEsMkJBQTJCLEdBQXhDO0lBQ0ksU0FBUyxDQUFDLFVBQWlCLEVBQUUsR0FBUSxFQUFFLEtBQVU7UUFDN0MsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBRWQsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFTLElBQUk7WUFDNUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ3RCLEtBQUssRUFBRSxDQUFDO1lBQ1osQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNqQixDQUFDO0NBQ0osQ0FBQTtBQVpZLDJCQUEyQjtJQUp2QyxXQUFJLENBQUM7UUFDRixJQUFJLEVBQUUseUJBQXlCO1FBQy9CLElBQUksRUFBRSxLQUFLO0tBQ2QsQ0FBQztHQUNXLDJCQUEyQixDQVl2QztBQVpZLGtFQUEyQjs7Ozs7Ozs7OztBQ054Qyx3Q0FBb0Q7QUFFcEQsZ0VBQWdFO0FBQ2hFLHFCQUFxQjtBQUlyQixJQUFhLFlBQVksR0FBekI7SUFDSSxTQUFTLENBQUMsVUFBaUIsRUFBRSxHQUFRLEVBQUUsS0FBVTtRQUM3QyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7UUFFZCxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQVMsSUFBSTtZQUM1QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDdEIsS0FBSyxFQUFFLENBQUM7WUFDWixDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxhQUFhO1FBQ2IsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQztJQUNwQyxDQUFDO0NBQ0osQ0FBQTtBQWJZLFlBQVk7SUFIeEIsV0FBSSxDQUFDO1FBQ0YsSUFBSSxFQUFFLFVBQVU7S0FDbkIsQ0FBQztHQUNXLFlBQVksQ0FheEI7QUFiWSxvQ0FBWTs7Ozs7Ozs7OztBQ1B6Qix3Q0FBb0Q7QUFFcEQsZ0VBQWdFO0FBQ2hFLHFCQUFxQjtBQUtyQixJQUFhLHdCQUF3QixHQUFyQztJQUNJLFNBQVMsQ0FBQyxVQUFpQixFQUFFLEdBQVEsRUFBRSxLQUFVO1FBRTdDLElBQUksT0FBTyxHQUFVLEVBQUUsQ0FBQztRQUV4QixVQUFVLENBQUMsT0FBTyxDQUFDLFVBQVMsSUFBSTtZQUM1QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDdEIsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2QixDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ25CLENBQUM7Q0FDSixDQUFBO0FBYlksd0JBQXdCO0lBSnBDLFdBQUksQ0FBQztRQUNGLElBQUksRUFBRSxzQkFBc0I7UUFDNUIsSUFBSSxFQUFFLEtBQUs7S0FDZCxDQUFDO0dBQ1csd0JBQXdCLENBYXBDO0FBYlksNERBQXdCOzs7Ozs7Ozs7O0FDUnJDLHdDQUFvRDtBQU1wRCxJQUFhLHVCQUF1QixHQUFwQztJQUNJLFNBQVMsQ0FBQyxVQUFpQixFQUFFLEdBQVE7UUFDakMsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLFNBQVMsQ0FBQztZQUMzQixNQUFNLENBQUMsVUFBVSxDQUFDO1FBRXRCLElBQUksR0FBRyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsQ0FBQztRQUVOLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUNyQyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDM0IsR0FBRyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM3QixDQUFDO1FBQ0wsQ0FBQztRQUVELElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNkLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUNyQyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDN0IsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3QixDQUFDO1FBQ0wsQ0FBQztRQUVELE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztDQUNKLENBQUE7QUF2QlksdUJBQXVCO0lBSm5DLFdBQUksQ0FBQztRQUNGLElBQUksRUFBRSxxQkFBcUI7UUFDM0IsSUFBSSxFQUFFLEtBQUs7S0FDZCxDQUFDO0dBQ1csdUJBQXVCLENBdUJuQztBQXZCWSwwREFBdUI7Ozs7Ozs7Ozs7QUNOcEMsd0NBQXlDO0FBQ3pDLGdFQUEwRDtBQUUxRCxpRkFBNkU7QUFDN0UsbURBQStDO0FBQy9DLDJFQUF1RTtBQUN2RSx5RUFBcUU7QUFvQnJFLElBQWEsV0FBVyxHQUF4QjtDQUE0QixDQUFBO0FBQWYsV0FBVztJQWpCdkIsZUFBUSxDQUFDO1FBQ04sT0FBTyxFQUFFO1lBQ0wsZ0NBQWE7U0FDaEI7UUFDRCxZQUFZLEVBQUU7WUFDViwwREFBMkI7WUFDM0IsNEJBQVk7WUFDWixvREFBd0I7WUFDeEIsa0RBQXVCO1NBQzFCO1FBQ0QsT0FBTyxFQUFFO1lBQ0wsMERBQTJCO1lBQzNCLDRCQUFZO1lBQ1osb0RBQXdCO1lBQ3hCLGtEQUF1QjtTQUMxQjtLQUNKLENBQUM7R0FDVyxXQUFXLENBQUk7QUFBZixrQ0FBVzs7Ozs7Ozs7Ozs7OztBQzFCeEIsd0NBQTJDO0FBQzNDLDhCQUE4QjtBQUc5QixJQUFhLGFBQWEsR0FBMUI7SUFLSTtRQUNJLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7UUFFdEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFckQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQ2pCLENBQUMsRUFBQyxJQUFJLEVBQUUsSUFBSSxFQUEyQjtZQUNuQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdkIsR0FBRyxDQUFDLENBQUMsSUFBSSxRQUFRLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3hDLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO2dCQUN0QixDQUFDO1lBQ0wsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVELEVBQUUsQ0FBQyxJQUFZLEVBQUUsUUFBa0I7UUFDL0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUM5QixDQUFDO1FBRUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVELFNBQVMsQ0FBQyxJQUFZLEVBQUUsR0FBRyxJQUFXO1FBQ2xDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDO1lBQ3BCLElBQUk7WUFDSixJQUFJO1NBQ1AsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKLENBQUE7QUFuQ1ksYUFBYTtJQUR6QixpQkFBVSxFQUFFOztHQUNBLGFBQWEsQ0FtQ3pCO0FBbkNZLHNDQUFhOzs7Ozs7Ozs7Ozs7O0FDRjFCLHdDQUFrRDtBQUNsRCx3Q0FBcUM7QUFFckMsaUVBQTZEO0FBRzdELElBQWEsaUJBQWlCLEdBQTlCO0lBR0MsWUFBb0IsS0FBVyxFQUFVLGFBQTRCO1FBQWpELFVBQUssR0FBTCxLQUFLLENBQU07UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM5RCxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUVoQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFHRCxTQUFTLENBQUMsSUFBVTtRQUNoQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDTCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQU8sRUFBRSxDQUFPLEtBQU0sQ0FBQyxDQUFDLFFBQW1CLEdBQUksQ0FBQyxDQUFDLFFBQW1CLENBQUMsQ0FBQztRQUMzRixJQUFJO1lBQ0EsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFNLENBQUMsQ0FBQyxRQUFtQixHQUFJLENBQUMsQ0FBQyxRQUFtQixDQUFDLENBQUM7SUFDbkYsQ0FBQztJQUdKLDREQUE0RDtJQUN6RCxXQUFXLENBQUMsUUFBbUI7UUFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBQUEsQ0FBQztJQUVGLG1DQUFtQztJQUNuQyxRQUFRLENBQUMsSUFBVSxFQUFFLFFBQW1CO1FBQ3BDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztRQUV6QyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRTtZQUN0QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDakMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDO29CQUNmLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMvQixLQUFLLENBQUM7WUFDVixDQUFDO0lBQ1QsQ0FBQztJQUFBLENBQUM7SUFFRixtQ0FBbUM7SUFDbkMsUUFBUSxDQUFDLElBQVUsRUFBRSxRQUFtQjtRQUNwQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFDbkIsRUFBQyxJQUFJLEVBQUUsSUFBSSxFQUFDLEVBQ1osVUFBUyxRQUFhO1lBQ2xCLElBQUksQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7WUFFN0IsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDO2dCQUNULFFBQVEsRUFBRSxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDO1FBRVAsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUFBLENBQUM7SUFFRixxQ0FBcUM7SUFDckMsUUFBUSxDQUFDLElBQVUsRUFBRSxRQUFtQjtRQUNwQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxFQUFDLElBQUksRUFBRSxJQUFJLEVBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUVqRCxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRTtZQUN0QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDakMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUN4QixLQUFLLENBQUM7WUFDVixDQUFDO0lBQ1QsQ0FBQztJQUFBLENBQUM7SUFHRixvRUFBb0U7SUFDcEUsZ0JBQWdCLENBQUMsUUFBbUI7UUFDaEMsSUFBSSxDQUFDLENBQUM7UUFDTixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFFaEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDO2FBQzFCLFNBQVMsRUFBRTthQUNYLElBQUksQ0FBQyxVQUFTLFFBQWE7WUFDeEIsZUFBZTtZQUNmLElBQUksVUFBVSxHQUFHLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDOUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDckMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN0QixDQUFDO1lBRUQsSUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQzVCLElBQUksV0FBVyxHQUFHLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMxQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQ2hDLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdkIsQ0FBQztZQUVELElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVMsSUFBVSxFQUFFLEdBQVc7Z0JBQy9DLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBUyxRQUFjLEVBQUUsR0FBVztvQkFDOUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxRQUFRLENBQUMsR0FBRzt3QkFDekIsSUFBSSxDQUFDLFFBQVEsS0FBSyxRQUFRLENBQUMsUUFBUTt3QkFDbkMsSUFBSSxDQUFDLElBQUksS0FBSyxRQUFRLENBQUMsSUFBSTt3QkFDM0IsSUFBSSxDQUFDLFNBQVMsS0FBSyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzt3QkFFeEMsK0NBQStDO3dCQUMvQyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUNwQixXQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUN6QixDQUFDO2dCQUNMLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUM7WUFFSCxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUMxQyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUM1QixDQUFDO1lBQ0wsQ0FBQztZQUNELEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDdEMsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3ZCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM5QixDQUFDO1lBQ0wsQ0FBQztZQUdELEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQztnQkFDVCxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkIsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLENBQUMsS0FBSztZQUNULElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQzlDLE9BQU8sQ0FBQyxLQUFLLENBQUMsd0JBQXdCLEVBQUUsS0FBSyxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUMsQ0FBQztRQUNwRSxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFBQSxDQUFDO0lBRUcsSUFBSSxDQUFDLEdBQVcsRUFBRSxHQUFRLEVBQUUsUUFBbUI7UUFDdEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQzthQUN4QixTQUFTLEVBQUU7YUFDTCxJQUFJLENBQUMsVUFBUyxRQUFRO1lBQ25CLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ1gsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3ZCLENBQUM7UUFDTCxDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsQ0FBQyxLQUFLO1lBQ1QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDOUMsT0FBTyxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsRUFBRSxLQUFLLENBQUMsT0FBTyxJQUFJLEtBQUssQ0FBQyxDQUFDO1FBQ3BFLENBQUMsQ0FBQyxDQUFDO0lBQ1YsQ0FBQztDQU1ELENBQUE7QUF0SVksaUJBQWlCO0lBRDdCLGlCQUFVLEVBQUU7cUNBSWUsV0FBSSxFQUF5Qiw4QkFBYTtHQUh6RCxpQkFBaUIsQ0FzSTdCO0FBdElZLDhDQUFpQjs7Ozs7Ozs7Ozs7OztBQ045Qix3Q0FBMEM7QUFDMUMseUVBQXFFO0FBQ3JFLGlFQUE2RDtBQU03RCxJQUFhLGlCQUFpQixHQUE5QjtJQVVJLFlBQVksVUFBNkIsRUFBRSxhQUE0QjtRQUNuRSxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUM7UUFFOUIsYUFBYTtRQUNiLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFDLENBQUM7UUFDcEUsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUMsQ0FBQztRQUN4RSxJQUFJLENBQUMscUJBQXFCLEdBQUcsS0FBSyxDQUFDO1FBRW5DLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFNUIsYUFBYSxDQUFDLFNBQVMsQ0FBQyxhQUFhLEVBQUUsRUFBQyxJQUFJLEVBQUUsZUFBZSxFQUFDLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBR0QscUJBQXFCO0lBQ3JCLFFBQVEsQ0FBQyxJQUFVO1FBQ2YsSUFBSSxDQUFDLENBQUM7UUFFTixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ3RELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3pDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0lBQ3hCLENBQUM7SUFBQSxDQUFDO0lBRUYsbUJBQW1CO0lBQ25CLFlBQVksQ0FBQyxJQUFVO1FBQ25CLCtCQUErQjtRQUMvQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN0QyxLQUFLLENBQUMsd0NBQXdDLENBQUMsQ0FBQztZQUNoRCxNQUFNLENBQUM7UUFDWCxDQUFDO1FBRUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQUNsRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUN6QyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUVyQixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUUvQixJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFBQSxDQUFDO0lBRUYsbUJBQW1CO0lBQ25CLDhEQUE4RDtJQUM5RCxzQkFBc0IsQ0FBQyxDQUFnQixFQUFFLElBQVU7UUFDL0MsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDL0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QixDQUFDO0lBQ0wsQ0FBQztJQUFBLENBQUM7SUFFRixzQkFBc0I7SUFDdEIsY0FBYyxDQUFDLElBQVU7UUFDckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDekIsQ0FBQztJQUFBLENBQUM7SUFFRix1QkFBdUI7SUFDdkIsVUFBVSxDQUFDLElBQVU7UUFDakIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUFBLENBQUM7SUFFRixrQ0FBa0M7SUFDbEMsbUJBQW1CLENBQUMsSUFBVTtRQUMxQixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBQUEsQ0FBQztJQUVGLHdDQUF3QztJQUN4QyxVQUFVO1FBQ04sK0JBQStCO1FBQy9CLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDekQsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQztZQUNsQyxNQUFNLENBQUM7UUFDWCxDQUFDO1FBRUQsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQztRQUN6RCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUM5QixJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7UUFDbkMsQ0FBQztRQUNELElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDO1lBQ3JCLFFBQVEsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVE7WUFDcEMsSUFBSSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSTtZQUM1QixTQUFTLEVBQUUsS0FBSztZQUNoQixPQUFPLEVBQUUsS0FBSztTQUNqQixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMscUJBQXFCLEdBQUcsS0FBSyxDQUFDO1FBQ25DLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNoQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7UUFFNUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBQUEsQ0FBQztDQUNMLENBQUE7QUFwR1ksaUJBQWlCO0lBSjdCLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsV0FBVztRQUNyQixXQUFXLEVBQUUsdURBQXVEO0tBQ3ZFLENBQUM7cUNBVzBCLHNDQUFpQixFQUFpQiw4QkFBYTtHQVY5RCxpQkFBaUIsQ0FvRzdCO0FBcEdZLDhDQUFpQjs7Ozs7Ozs7OztBQ1Y5Qix3Q0FBeUM7QUFDekMsZ0VBQTBEO0FBQzFELDBDQUErQztBQUUvQyw2REFBeUQ7QUFFekQsMERBQXNEO0FBQ3RELHlFQUFxRTtBQUNyRSxpRUFBNkQ7QUFhN0QsSUFBYSxjQUFjLEdBQTNCO0NBQStCLENBQUE7QUFBbEIsY0FBYztJQVgxQixlQUFRLENBQUM7UUFDTixPQUFPLEVBQUU7WUFDTCxnQ0FBYTtZQUNiLG1CQUFXO1lBQ1gsMEJBQVc7U0FDZDtRQUNELFlBQVksRUFBRSxDQUFFLHNDQUFpQixDQUFFO1FBQ25DLFNBQVMsRUFBRSxDQUFFLHNDQUFpQixFQUFFLDhCQUFhLENBQUU7UUFDL0MsT0FBTyxFQUFFLENBQUUsc0NBQWlCLENBQUU7UUFDOUIsU0FBUyxFQUFFLENBQUUsc0NBQWlCLENBQUU7S0FDbkMsQ0FBQztHQUNXLGNBQWMsQ0FBSTtBQUFsQix3Q0FBYzs7OztBQ3JCM0IsZ0ZBQTJFO0FBQzNFLHVDQUFxQztBQUVyQywwREFBc0Q7QUFFdEQsaURBQXNCLEVBQUUsQ0FBQyxlQUFlLENBQUMsc0JBQVMsQ0FBQyxDQUFDOztBQ0xwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyB0YXNrc01vZGVsU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvdGFza3NNb2RlbC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRXZlbnRzU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvZXZlbnRzLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2FwcCcsXHJcbiAgICB0ZW1wbGF0ZVVybDogJ2FwcENvbXBvbmVudC9hcHAudGVtcGxhdGUuaHRtbCdcclxufSlcclxuZXhwb3J0IGNsYXNzIGFwcENvbXBvbmVudCB7XHJcbiAgICB0YXNrc01vZGVsOiB0YXNrc01vZGVsU2VydmljZTtcclxuXHJcbiAgICByZXNwb25zZUVycm9yOiB7c3RhdGU6IGJvb2xlYW4sIHRpbWVyOiBhbnl9O1xyXG4gICAgaHR0cEVycm9yVGV4dDogc3RyaW5nO1xyXG5cclxuICAgIG1lbnVMaXN0ID0gW1xyXG4gICAgICAgIHsgbmFtZTogJ01haW4gcGFnZScsIGxpbms6ICdtYWlucGFnZScsIGFjdGl2ZTogZmFsc2UgfSxcclxuICAgICAgICB7IG5hbWU6ICdMaXN0IG9mIHRhc2tzJywgbGluazogJ3Rhc2tsaXN0JywgYWN0aXZlOiBmYWxzZSB9XHJcbiAgICBdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHRhc2tzTW9kZWw6IHRhc2tzTW9kZWxTZXJ2aWNlLCBldmVudHNTZXJ2aWNlOiBFdmVudHNTZXJ2aWNlKSB7XHJcbiAgICAgICAgdGhpcy50YXNrc01vZGVsID0gdGFza3NNb2RlbDtcclxuICAgICAgICB0aGlzLnJlc3BvbnNlRXJyb3IgPSB7IHN0YXRlOiBmYWxzZSwgdGltZXI6IHt9IH07XHJcblxyXG4gICAgICAgIC8vIFdoZW4gc2VsZWN0ZWQgY29tcG9uZW50IGlzIGNoYW5nZWRcclxuICAgICAgICBldmVudHNTZXJ2aWNlLm9uKCdwYWdlQ2hhbmdlZCcsIChkYXRhOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgLy8gQ2hvb3NlIHRoZSBhY3RpdmUgZWxlbWVudCBpbiB0aGUgaGVhZGVyJ3MgbWVudSBsaXN0XHJcbiAgICAgICAgICAgIHRoaXMubWVudUxpc3QuZm9yRWFjaChmdW5jdGlvbihlbGVtKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZWxlbS5uYW1lID09PSBkYXRhLm5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBXaGVuIHNvbWUgZXJyb3Igb2NjdXJlZFxyXG4gICAgICAgIGV2ZW50c1NlcnZpY2Uub24oJ3Jlc3BvbnNlRXJyb3InLCAoZXZlbnQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAvLyBJZiBlcnJvciBlbGVtZW50IGlzIHNob3duIC0gdXBkYXRlIGl0J3MgYW5pbWF0aW9uXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnJlc3BvbnNlRXJyb3Iuc3RhdGUgPT0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5yZXNwb25zZUVycm9yLnRpbWVyKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMucmVzcG9uc2VFcnJvci50aW1lcik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3BvbnNlRXJyb3Iuc3RhdGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmh0dHBFcnJvclRleHQgPSAnUmVjZWl2ZWQgYW4gZXJyb3IgZnJvbSB0aGUgc2VydmVyJztcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzcG9uc2VFcnJvci5zdGF0ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3BvbnNlRXJyb3IudGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc3BvbnNlRXJyb3Iuc3RhdGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0sIDQzMDApO1xyXG4gICAgICAgICAgICB9LCAwKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgdXBkYXRlRGF0YSgpIHtcclxuICAgICAgICB0aGlzLnRhc2tzTW9kZWwudXBkYXRlRGF0YUZyb21EQigpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9odHRwJztcclxuaW1wb3J0IHsgQnJvd3Nlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xyXG5cclxuaW1wb3J0IHsgYXBwQ29tcG9uZW50IH0gZnJvbSAnLi9hcHAuY29tcG9uZW50JztcclxuaW1wb3J0IHsgb3ZlcnZpZXdNb2R1bGUgfSBmcm9tICcuL292ZXJ2aWV3Q29tcG9uZW50L292ZXJ2aWV3Lm1vZHVsZSc7XHJcbmltcG9ydCB7IHRhc2tMaXN0TW9kdWxlIH0gZnJvbSAnLi90YXNrTGlzdENvbXBvbmVudC90YXNrTGlzdC5tb2R1bGUnO1xyXG5cclxuaW1wb3J0IHsgdGFza3NNb2RlbFNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL3Rhc2tzTW9kZWwuc2VydmljZSc7XHJcbmltcG9ydCB7IEV2ZW50c1NlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2V2ZW50cy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgYXBwUm91dGluZ01vZHVsZSB9IGZyb20gJy4vYXBwUm91dGluZy9hcHBSb3V0aW5nLm1vZHVsZSc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW1xyXG4gICAgICAgIEJyb3dzZXJNb2R1bGUsXHJcbiAgICAgICAgSHR0cE1vZHVsZSxcclxuICAgICAgICBvdmVydmlld01vZHVsZSxcclxuICAgICAgICB0YXNrTGlzdE1vZHVsZSxcclxuICAgICAgICBhcHBSb3V0aW5nTW9kdWxlXHJcbiAgICBdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbIGFwcENvbXBvbmVudCBdLFxyXG4gICAgcHJvdmlkZXJzOiBbIHRhc2tzTW9kZWxTZXJ2aWNlLCBFdmVudHNTZXJ2aWNlIF0sXHJcbiAgICBib290c3RyYXA6IFsgYXBwQ29tcG9uZW50IF1cclxufSlcclxuZXhwb3J0IGNsYXNzIGFwcE1vZHVsZSB7ICB9XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gICAgICAgICAgICAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlck1vZHVsZSwgUm91dGVzIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuXHJcbi8vIEltcG9ydCBjb21wb25lbnRzXHJcbmltcG9ydCB7IG92ZXJ2aWV3Q29tcG9uZW50IH0gZnJvbSAnLi8uLi9vdmVydmlld0NvbXBvbmVudC9vdmVydmlldy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyB0YXNrTGlzdENvbXBvbmVudCB9IGZyb20gJy4vLi4vdGFza0xpc3RDb21wb25lbnQvdGFza0xpc3QuY29tcG9uZW50JztcclxuXHJcbmNvbnN0IHJvdXRlczogUm91dGVzID0gW1xyXG4gICAgeyBwYXRoOicnLCByZWRpcmVjdFRvOiAnL21haW5wYWdlJywgcGF0aE1hdGNoOiAnZnVsbCcgfSxcclxuICAgIHsgcGF0aDonbWFpbnBhZ2UnLCBjb21wb25lbnQ6IG92ZXJ2aWV3Q29tcG9uZW50IH0sXHJcbiAgICB7IHBhdGg6J3Rhc2tsaXN0JywgY29tcG9uZW50OiB0YXNrTGlzdENvbXBvbmVudCB9XHJcbl07XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogWyBSb3V0ZXJNb2R1bGUuZm9yUm9vdChyb3V0ZXMsIHt1c2VIYXNoOiB0cnVlfSkgXSxcclxuICAgIGV4cG9ydHM6IFsgUm91dGVyTW9kdWxlIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIGFwcFJvdXRpbmdNb2R1bGUge31cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IHRhc2tzTW9kZWxTZXJ2aWNlIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy90YXNrc01vZGVsLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcblx0c2VsZWN0b3I6ICdsaXN0LW92ZXJ2aWV3JyxcclxuXHR0ZW1wbGF0ZVVybDogJ2FwcENvbXBvbmVudC9vdmVydmlld0NvbXBvbmVudC9vdmVydmlldy50ZW1wbGF0ZS5odG1sJ1xyXG59KVxyXG5leHBvcnQgY2xhc3Mgb3ZlcnZpZXdDb21wb25lbnQge1xyXG4gICAgdGFza3M6IGFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih0YXNrc01vZGVsOiB0YXNrc01vZGVsU2VydmljZSkge1xyXG4gICAgICAgIHRoaXMudGFza3MgPSB0YXNrc01vZGVsLnRhc2tzO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQnJvd3Nlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xyXG5cclxuaW1wb3J0IHsgb3ZlcnZpZXdDb21wb25lbnQgfSBmcm9tICcuL292ZXJ2aWV3LmNvbXBvbmVudCc7XHJcblxyXG5pbXBvcnQgeyBQaXBlc01vZHVsZSB9IGZyb20gJy4vLi4vcGlwZXMvcGlwZXMubW9kdWxlJztcclxuXHJcbmltcG9ydCB7IHRhc2tzTW9kZWxTZXJ2aWNlIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy90YXNrc01vZGVsLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBFdmVudHNTZXJ2aWNlIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy9ldmVudHMuc2VydmljZSc7XHJcblxyXG5cclxuQE5nTW9kdWxlKHtcclxuXHRpbXBvcnRzOiBbXHJcbiAgICAgICAgQnJvd3Nlck1vZHVsZSxcclxuICAgICAgICBQaXBlc01vZHVsZVxyXG4gICAgXSxcclxuXHRkZWNsYXJhdGlvbnM6IFsgb3ZlcnZpZXdDb21wb25lbnQgXSxcclxuICAgIHByb3ZpZGVyczogWyB0YXNrc01vZGVsU2VydmljZSwgRXZlbnRzU2VydmljZSBdLFxyXG4gICAgZXhwb3J0czogWyBvdmVydmlld0NvbXBvbmVudCBdLFxyXG5cdGJvb3RzdHJhcDogWyBvdmVydmlld0NvbXBvbmVudCBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBvdmVydmlld01vZHVsZSB7IH0iLCJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5AUGlwZSh7XHJcbiAgICBuYW1lOiAnZWxlbUluT2Jqc0VxdWFsc1RvQ291bnQnLFxyXG4gICAgcHVyZTogZmFsc2VcclxufSlcclxuZXhwb3J0IGNsYXNzIGVsZW1Jbk9ianNFcXVhbHNUb0NvdW50UGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG4gICAgdHJhbnNmb3JtKGNvbGxlY3Rpb246IGFueVtdLCBrZXk6IGFueSwgdmFsdWU6IGFueSk6IG51bWJlciB7XHJcbiAgICAgICAgdmFyIGNvdW50ID0gMDtcclxuXHJcbiAgICAgICAgY29sbGVjdGlvbi5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcclxuICAgICAgICAgICAgaWYgKGl0ZW1ba2V5XSA9PT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGNvdW50Kys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNvdW50O1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuLy8gRmlsdGVyIHRoYXQgY2hlY2sgaWYgdGhlcmUgaXMgbm8gYW5vdGhlciB2YWx1ZXMgd2l0aCB0aGlzIGtleVxyXG4vLyBpbiB0aGlzIGNvbGxlY3Rpb25cclxuQFBpcGUoe1xyXG4gICAgbmFtZTogJ2lzVW5pcXVlJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgaXNVbmlxdWVQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XHJcbiAgICB0cmFuc2Zvcm0oY29sbGVjdGlvbjogYW55W10sIGtleTogYW55LCB2YWx1ZTogYW55KTogYm9vbGVhbiB7XHJcbiAgICAgICAgdmFyIGNvdW50ID0gMDtcclxuXHJcbiAgICAgICAgY29sbGVjdGlvbi5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcclxuICAgICAgICAgICAgaWYgKGl0ZW1ba2V5XSA9PT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGNvdW50Kys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gMSAtIGl0c2VsZlxyXG4gICAgICAgIHJldHVybiBjb3VudCA+IDEgPyBmYWxzZSA6IHRydWU7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG4vLyBGaWx0ZXIgdGhhdCBjaGVjayBpZiB0aGVyZSBpcyBubyBhbm90aGVyIHZhbHVlcyB3aXRoIHRoaXMga2V5XHJcbi8vIGluIHRoaXMgY29sbGVjdGlvblxyXG5AUGlwZSh7XHJcbiAgICBuYW1lOiAnb2Jqc1ZhcmlhYmxlRXF1YWxzVG8nLFxyXG4gICAgcHVyZTogZmFsc2VcclxufSlcclxuZXhwb3J0IGNsYXNzIG9ianNWYXJpYWJsZUVxdWFsc1RvUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG4gICAgdHJhbnNmb3JtKGNvbGxlY3Rpb246IGFueVtdLCBrZXk6IGFueSwgdmFsdWU6IGFueSk6IGFueVtdIHtcclxuXHJcbiAgICAgICAgdmFyIHJlc0NvbGw6IGFueVtdID0gW107XHJcblxyXG4gICAgICAgIGNvbGxlY3Rpb24uZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XHJcbiAgICAgICAgICAgIGlmIChpdGVtW2tleV0gPT09IHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICByZXNDb2xsLnB1c2goaXRlbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc0NvbGw7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5AUGlwZSh7XHJcbiAgICBuYW1lOiAnb2Jqc1dpdGhNaW5WYXJpYWJsZScsXHJcbiAgICBwdXJlOiBmYWxzZVxyXG59KVxyXG5leHBvcnQgY2xhc3Mgb2Jqc1dpdGhNaW5WYXJpYWJsZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuICAgIHRyYW5zZm9ybShjb2xsZWN0aW9uOiBhbnlbXSwga2V5OiBhbnkpOiBhbnlbXSB7XHJcbiAgICAgICAgaWYgKGNvbGxlY3Rpb25bMF0gPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICByZXR1cm4gY29sbGVjdGlvbjtcclxuXHJcbiAgICAgICAgdmFyIG1pbiA9IGNvbGxlY3Rpb25bMF1ba2V5XTtcclxuICAgICAgICB2YXIgaTtcclxuXHJcbiAgICAgICAgZm9yIChpID0gMTsgaSA8IGNvbGxlY3Rpb24ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGNvbGxlY3Rpb25baV1ba2V5XSA8IG1pbikge1xyXG4gICAgICAgICAgICAgICAgbWluID0gY29sbGVjdGlvbltpXVtrZXldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgb2JqcyA9IFtdO1xyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBjb2xsZWN0aW9uLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChjb2xsZWN0aW9uW2ldW2tleV0gPT09IG1pbikge1xyXG4gICAgICAgICAgICAgICAgb2Jqcy5wdXNoKGNvbGxlY3Rpb25baV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gb2JqcztcclxuICAgIH1cclxufSIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEJyb3dzZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcclxuXHJcbmltcG9ydCB7IGVsZW1Jbk9ianNFcXVhbHNUb0NvdW50UGlwZSB9IGZyb20gJy4vZWxlbUluT2Jqc0VxdWFsc1RvQ291bnQucGlwZSc7XHJcbmltcG9ydCB7IGlzVW5pcXVlUGlwZSB9IGZyb20gJy4vaXNVbmlxdWUucGlwZSc7XHJcbmltcG9ydCB7IG9ianNWYXJpYWJsZUVxdWFsc1RvUGlwZSB9IGZyb20gJy4vb2Jqc1ZhcmlhYmxlRXF1YWxzVG8ucGlwZSc7XHJcbmltcG9ydCB7IG9ianNXaXRoTWluVmFyaWFibGVQaXBlIH0gZnJvbSAnLi9vYmpzV2l0aE1pblZhcmlhYmxlLnBpcGUnO1xyXG5cclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgQnJvd3Nlck1vZHVsZVxyXG4gICAgXSxcclxuICAgIGRlY2xhcmF0aW9uczogW1xyXG4gICAgICAgIGVsZW1Jbk9ianNFcXVhbHNUb0NvdW50UGlwZSxcclxuICAgICAgICBpc1VuaXF1ZVBpcGUsXHJcbiAgICAgICAgb2Jqc1ZhcmlhYmxlRXF1YWxzVG9QaXBlLFxyXG4gICAgICAgIG9ianNXaXRoTWluVmFyaWFibGVQaXBlXHJcbiAgICBdLFxyXG4gICAgZXhwb3J0czogW1xyXG4gICAgICAgIGVsZW1Jbk9ianNFcXVhbHNUb0NvdW50UGlwZSxcclxuICAgICAgICBpc1VuaXF1ZVBpcGUsXHJcbiAgICAgICAgb2Jqc1ZhcmlhYmxlRXF1YWxzVG9QaXBlLFxyXG4gICAgICAgIG9ianNXaXRoTWluVmFyaWFibGVQaXBlXHJcbiAgICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQaXBlc01vZHVsZSB7IH0iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCAqIGFzIFJ4IGZyb20gJ3J4anMvUngnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRXZlbnRzU2VydmljZSB7XHJcbiAgICBsaXN0ZW5lcnM6IGFueTtcclxuICAgIGV2ZW50c1N1YmplY3Q6IGFueTtcclxuICAgIGV2ZW50czogYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMubGlzdGVuZXJzID0ge307XHJcbiAgICAgICAgdGhpcy5ldmVudHNTdWJqZWN0ID0gbmV3IFJ4LlN1YmplY3QoKTtcclxuXHJcbiAgICAgICAgdGhpcy5ldmVudHMgPSBSeC5PYnNlcnZhYmxlLmZyb20odGhpcy5ldmVudHNTdWJqZWN0KTtcclxuXHJcbiAgICAgICAgdGhpcy5ldmVudHMuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAoe25hbWUsIGFyZ3N9OiB7bmFtZTogYW55LCBhcmdzOiBhbnlbXX0pID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxpc3RlbmVyc1tuYW1lXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGxpc3RlbmVyIG9mIHRoaXMubGlzdGVuZXJzW25hbWVdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyKC4uLmFyZ3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgb24obmFtZTogc3RyaW5nLCBsaXN0ZW5lcjogRnVuY3Rpb24pIHtcclxuICAgICAgICBpZiAoIXRoaXMubGlzdGVuZXJzW25hbWVdKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGlzdGVuZXJzW25hbWVdID0gW107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmxpc3RlbmVyc1tuYW1lXS5wdXNoKGxpc3RlbmVyKTtcclxuICAgIH1cclxuXHJcbiAgICBicm9hZGNhc3QobmFtZTogc3RyaW5nLCAuLi5hcmdzOiBhbnlbXSkge1xyXG4gICAgICAgIHRoaXMuZXZlbnRzU3ViamVjdC5uZXh0KHtcclxuICAgICAgICAgICAgbmFtZSxcclxuICAgICAgICAgICAgYXJnc1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgdGFzayB9IGZyb20gJy4vLi4vaW50ZXJmYWNlcyc7XHJcblxyXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XHJcblxyXG5pbXBvcnQgeyBFdmVudHNTZXJ2aWNlIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy9ldmVudHMuc2VydmljZSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyB0YXNrc01vZGVsU2VydmljZSB7XHJcblx0dGFza3M6IHRhc2tbXTtcclxuICAgIFxyXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgJGh0dHA6IEh0dHAsIHByaXZhdGUgZXZlbnRzU2VydmljZTogRXZlbnRzU2VydmljZSkge1xyXG4gICAgICAgIHRoaXMudGFza3MgPSBbXTtcclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVEYXRhRnJvbURCKHRoaXMuc29ydFRhc2tzKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgc29ydFRhc2tzKHNlbGY/OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBpZiAoc2VsZilcclxuICAgICAgICAgICAgc2VsZi50YXNrcy5zb3J0KChhOiB0YXNrLCBiOiB0YXNrKSA9PiAoYS5zZXZlcml0eSBhcyBudW1iZXIpIC0gKGIuc2V2ZXJpdHkgYXMgbnVtYmVyKSk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLnRhc2tzLnNvcnQoKGEsIGIpID0+IChhLnNldmVyaXR5IGFzIG51bWJlcikgLSAoYi5zZXZlcml0eSBhcyBudW1iZXIpKTtcclxuICAgIH1cclxuXHJcblxyXG5cdC8vIFBvc3QgcmVxdWVzdCAtIHVwZGF0ZSBBTEwgdGFza3MgaW4gZGIgKHNlbmRpbmcgYWxsIHRhc2tzKVxyXG4gICAgZGJVcGRhdGVBbGwoY2FsbGJhY2s/OiBGdW5jdGlvbikge1xyXG4gICAgICAgIHRoaXMucG9zdCgnL3VwZGF0ZVRhc2tzJywgdGhpcy50YXNrcywgY2FsbGJhY2spO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBQb3N0IHJlcXVlc3QgLSB1cGRhdGUgdGFzayBpbiBkYlxyXG4gICAgZGJVcGRhdGUodGFzazogdGFzaywgY2FsbGJhY2s/OiBGdW5jdGlvbikge1xyXG4gICAgICAgIHRoaXMucG9zdCgnL3VwZGF0ZVRhc2snLCB0YXNrLCBjYWxsYmFjayk7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy50YXNrcy5sZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgaWYgKHRoaXMudGFza3NbaV0uX2lkID09PSB0YXNrLl9pZCkge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiBpbiB0YXNrKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFza3NbaV1bal0gPSB0YXNrW2pdO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLy8gUG9zdCByZXF1ZXN0IC0gaW5zZXJ0IHRhc2sgaW4gZGJcclxuICAgIGRiSW5zZXJ0KHRhc2s6IHRhc2ssIGNhbGxiYWNrPzogRnVuY3Rpb24pIHtcclxuICAgICAgICB0aGlzLnBvc3QoJy9pbnNlcnRUYXNrJyxcclxuICAgICAgICAgICAge3Rhc2s6IHRhc2t9LFxyXG4gICAgICAgICAgICBmdW5jdGlvbihyZXNwb25zZTogYW55KSB7XHJcbiAgICAgICAgICAgICAgICB0YXNrLl9pZCA9IHJlc3BvbnNlLmRhdGEuX2lkO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjaylcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy50YXNrcy5wdXNoKHRhc2spO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBQb3N0IHJlcXVlc3QgLSBkZWxldGUgdGFzayBmcm9tIGRiXHJcbiAgICBkYkRlbGV0ZSh0YXNrOiB0YXNrLCBjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5wb3N0KCcvZGVsZXRlVGFzaycsIHt0YXNrOiB0YXNrfSwgY2FsbGJhY2spO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMudGFza3MubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRhc2tzW2ldLl9pZCA9PT0gdGFzay5faWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGFza3Muc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgIH07XHJcblxyXG5cclxuICAgIC8vIEdldCByZXF1ZXN0IC0gZ2V0IGFsbCB0YXNrcyBmcm9tIGRiICh0byB1cGRhdGUgbG9jYWwgdGFza3MgYXJyYXkpXHJcbiAgICB1cGRhdGVEYXRhRnJvbURCKGNhbGxiYWNrPzogRnVuY3Rpb24pIHtcclxuICAgICAgICB2YXIgaTtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgIHRoaXMuJGh0dHAuZ2V0KCcvZ2V0VGFza3MnKVxyXG4gICAgICAgIC50b1Byb21pc2UoKVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlOiBhbnkpIHtcclxuICAgICAgICAgICAgLy8gMCAtIGRlbC9wdXNoXHJcbiAgICAgICAgICAgIHZhciB0YXNrc1RvRGVsID0gbmV3IEFycmF5KHNlbGYudGFza3MubGVuZ3RoKTtcclxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHNlbGYudGFza3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHRhc2tzVG9EZWxbaV0gPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgdGFza3MgPSByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgICAgIHZhciB0YXNrc1RvUHVzaCA9IG5ldyBBcnJheSh0YXNrcy5sZW5ndGgpO1xyXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgdGFza3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHRhc2tzVG9QdXNoW2ldID0gMDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc2VsZi50YXNrcy5mb3JFYWNoKGZ1bmN0aW9uKHRhc2s6IHRhc2ssIGluZDogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgICAgICB0YXNrcy5mb3JFYWNoKGZ1bmN0aW9uKHJlc3BUYXNrOiB0YXNrLCBqbmQ6IG51bWJlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0YXNrLl9pZCA9PT0gcmVzcFRhc2suX2lkICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhc2suc2V2ZXJpdHkgPT09IHJlc3BUYXNrLnNldmVyaXR5ICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhc2sudGV4dCA9PT0gcmVzcFRhc2sudGV4dCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXNrLmNvbXBsZXRlZCA9PT0gcmVzcFRhc2suY29tcGxldGVkKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBEbyBub3QgcmV3cml0ZSBleGlzdGluZyB0YXNrcyAod2l0aCAxIHZhbHVlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXNrc1RvRGVsW2luZF0gPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXNrc1RvUHVzaFtqbmRdID0gMTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGkgPSB0YXNrc1RvRGVsLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGFza3NUb0RlbFtpXSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYudGFza3Muc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCB0YXNrc1RvUHVzaC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRhc2tzVG9QdXNoW2ldID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi50YXNrcy5wdXNoKHRhc2tzW2ldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaylcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHNlbGYpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmV2ZW50c1NlcnZpY2UuYnJvYWRjYXN0KCdyZXNwb25zZUVycm9yJyk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGR1cmluZyByZXF1ZXN0OiAnLCBlcnJvci5tZXNzYWdlIHx8IGVycm9yKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG5cdHByaXZhdGUgcG9zdChyZXE6IHN0cmluZywgb2JqOiBhbnksIGNhbGxiYWNrPzogRnVuY3Rpb24pIHtcclxuXHRcdHRoaXMuJGh0dHAucG9zdChyZXEsIG9iailcclxuXHRcdC50b1Byb21pc2UoKVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2socmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzU2VydmljZS5icm9hZGNhc3QoJ3Jlc3BvbnNlRXJyb3InKTtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZHVyaW5nIHJlcXVlc3Q6ICcsIGVycm9yLm1lc3NhZ2UgfHwgZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG5cdH1cclxuXHJcbiAgICAvKnByaXZhdGUgaGFuZGxlRXJyb3IoZXJyb3I6IGFueSkgeyAgICAgICAgLy8gJ3RoaXMnIHNvbWVob3cgbGlua3MgdG8gJ3VuZGVmaW5lZCcgaW5zdGVhZCBvZiBjbGFzc1xyXG4gICAgICAgIHRoaXMuZXZlbnRzU2VydmljZS5icm9hZGNhc3QoJ3Jlc3BvbnNlRXJyb3InKTtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBkdXJpbmcgcmVxdWVzdDogJywgZXJyb3IubWVzc2FnZSB8fCBlcnJvcik7XHJcbiAgICB9Ki9cclxufSIsImltcG9ydCB7IHRhc2sgfSBmcm9tICcuLy4uL2ludGVyZmFjZXMnO1xyXG5cclxuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IHRhc2tzTW9kZWxTZXJ2aWNlIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy90YXNrc01vZGVsLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBFdmVudHNTZXJ2aWNlIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy9ldmVudHMuc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAndGFzay1saXN0JyxcclxuICAgIHRlbXBsYXRlVXJsOiAnYXBwQ29tcG9uZW50L3Rhc2tMaXN0Q29tcG9uZW50L3Rhc2tMaXN0LnRlbXBsYXRlLmh0bWwnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyB0YXNrTGlzdENvbXBvbmVudCB7XHJcbiAgICAvLyBGb3IgdGhlIHZpZXcgKGFuZCBteSBjb21mb3J0KVxyXG4gICAgdGFza3M6IHRhc2tbXTtcclxuICAgIHRhc2tzTW9kZWw6IGFueTtcclxuICAgIC8vIFRlbXBvcmFyeSBvYmplY3QgdGhhdCBjaGFuZ2luZyB3aXRoIG5nLW1vZGVsIG9uIGh0bWwgaW5wdXRcclxuICAgIHRlbXBUYXNrOiB0YXNrO1xyXG4gICAgLy8gVGFzayB3aWxsIGJlIGFkZGVkIGFmdGVyIGNyZWF0ZVRhc2sgZnVuY3Rpb25cclxuICAgIHRhc2tUb0NyZWF0ZTogdGFzaztcclxuICAgIHRhc2tUb0NyZWF0ZUlzSW52YWxpZDogYm9vbGVhbjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih0YXNrc01vZGVsOiB0YXNrc01vZGVsU2VydmljZSwgZXZlbnRzU2VydmljZTogRXZlbnRzU2VydmljZSkge1xyXG4gICAgICAgIHRoaXMudGFza3NNb2RlbCA9IHRhc2tzTW9kZWw7XHJcbiAgICAgICAgdGhpcy50YXNrcyA9IHRhc2tzTW9kZWwudGFza3M7XHJcblxyXG4gICAgICAgIC8vIEluaXRpYWxpemVcclxuICAgICAgICB0aGlzLnRlbXBUYXNrID0ge19pZDogJycsIHNldmVyaXR5OiAnJywgdGV4dDogJycsIGNvbXBsZXRlZDogZmFsc2V9O1xyXG4gICAgICAgIHRoaXMudGFza1RvQ3JlYXRlID0ge19pZDogJycsIHNldmVyaXR5OiAnJywgdGV4dDogJycsIGNvbXBsZXRlZDogZmFsc2V9O1xyXG4gICAgICAgIHRoaXMudGFza1RvQ3JlYXRlSXNJbnZhbGlkID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHRoaXMudGFza3NNb2RlbC5zb3J0VGFza3MoKTtcclxuXHJcbiAgICAgICAgZXZlbnRzU2VydmljZS5icm9hZGNhc3QoJ3BhZ2VDaGFuZ2VkJywge25hbWU6ICdMaXN0IG9mIHRhc2tzJ30pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyBTdGFydCB0YXNrIGVkaXRpbmdcclxuICAgIGVkaXRUYXNrKHRhc2s6IHRhc2spOiB2b2lkIHtcclxuICAgICAgICB2YXIgaTtcclxuXHJcbiAgICAgICAgdGhpcy50ZW1wVGFza1t0YXNrLl9pZF0gPSB7fTtcclxuICAgICAgICB0aGlzLnRlbXBUYXNrW3Rhc2suX2lkXS5zZXZlcml0eSA9IHRhc2suc2V2ZXJpdHkgKyAnJztcclxuICAgICAgICB0aGlzLnRlbXBUYXNrW3Rhc2suX2lkXS50ZXh0ID0gdGFzay50ZXh0O1xyXG4gICAgICAgIHRhc2suZWRpdGluZyA9IHRydWU7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIFNhdmUgZWRpdGVkIHRhc2tcclxuICAgIHNhdmVFZGl0VGFzayh0YXNrOiB0YXNrKTogdm9pZCB7XHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgdGV4dCBmaWVsZCBpcyBlbXB0eVxyXG4gICAgICAgIGlmICh0aGlzLnRlbXBUYXNrW3Rhc2suX2lkXS50ZXh0ID09PSAnJykge1xyXG4gICAgICAgICAgICBhbGVydCgnRW50ZXIgc29tZXRoaW5nIGluIHRhc2tcXCdzIHRleHQgZmllbGQhJyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRhc2suc2V2ZXJpdHkgPSArdGhpcy50ZW1wVGFza1t0YXNrLl9pZF0uc2V2ZXJpdHk7XHJcbiAgICAgICAgdGFzay50ZXh0ID0gdGhpcy50ZW1wVGFza1t0YXNrLl9pZF0udGV4dDtcclxuICAgICAgICB0YXNrLmVkaXRpbmcgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgdGhpcy50YXNrc01vZGVsLmRiVXBkYXRlKHRhc2spO1xyXG5cclxuICAgICAgICB0aGlzLnRhc2tzTW9kZWwuc29ydFRhc2tzKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIFNhdmUgZWRpdGVkIHRhc2tcclxuICAgIC8vICh3aGVuIHByZXNzZWQgY3RybCtlbnRlciB3aGlsZSBpbiB0ZXh0YXJlYSBvZiBlZGl0aW5nIHRhc2spXHJcbiAgICBjdHJsRW50ZXJfU2F2ZUVkaXRUYXNrKGU6IEtleWJvYXJkRXZlbnQsIHRhc2s6IHRhc2spOiB2b2lkIHtcclxuICAgICAgICBpZiAoZS5jdHJsS2V5ICYmIGUua2V5Q29kZSA9PSAxMykge1xyXG4gICAgICAgICAgICB0aGlzLnNhdmVFZGl0VGFzayh0YXNrKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIENhbmNlbCB0YXNrIGVkaXRpbmdcclxuICAgIGNhbmNlbEVkaXRUYXNrKHRhc2s6IHRhc2spOiB2b2lkIHtcclxuICAgICAgICB0YXNrLmVkaXRpbmcgPSBmYWxzZTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gRGVsZXRlIHRhc2sgKGJ1dHRvbilcclxuICAgIGRlbGV0ZVRhc2sodGFzazogdGFzayk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudGFza3NNb2RlbC5kYkRlbGV0ZSh0YXNrKTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gQ2hlY2svdW5jaGVjayBjb21wbGV0ZSBjaGVja2JveFxyXG4gICAgY2hhbmdlQ29tcGxldGVTdGF0ZSh0YXNrOiB0YXNrKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy50YXNrc01vZGVsLmRiVXBkYXRlKHRhc2spO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBDcmVhdGUgdGFzayAoYnkgZm9ybSBhYm92ZSB0aGUgdGFibGUpXHJcbiAgICBjcmVhdGVUYXNrKCk6IHZvaWQge1xyXG4gICAgICAgIC8vIENoZWNrIGlmIHRleHQgZmllbGQgaXMgZW1wdHlcclxuICAgICAgICBpZiAoIXRoaXMudGFza1RvQ3JlYXRlLnRleHQgfHwgIXRoaXMudGFza1RvQ3JlYXRlLnNldmVyaXR5KSB7XHJcbiAgICAgICAgICAgIHRoaXMudGFza1RvQ3JlYXRlSXNJbnZhbGlkID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy50YXNrVG9DcmVhdGUuc2V2ZXJpdHkgPSArdGhpcy50YXNrVG9DcmVhdGUuc2V2ZXJpdHk7XHJcbiAgICAgICAgaWYgKCF0aGlzLnRhc2tUb0NyZWF0ZS5zZXZlcml0eSkge1xyXG4gICAgICAgICAgICB0aGlzLnRhc2tUb0NyZWF0ZS5zZXZlcml0eSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudGFza3NNb2RlbC5kYkluc2VydCh7XHJcbiAgICAgICAgICAgIHNldmVyaXR5OiB0aGlzLnRhc2tUb0NyZWF0ZS5zZXZlcml0eSxcclxuICAgICAgICAgICAgdGV4dDogdGhpcy50YXNrVG9DcmVhdGUudGV4dCxcclxuICAgICAgICAgICAgY29tcGxldGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgZWRpdGluZzogZmFsc2VcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy50YXNrVG9DcmVhdGVJc0ludmFsaWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnRhc2tUb0NyZWF0ZS5zZXZlcml0eSA9ICcnO1xyXG4gICAgICAgIHRoaXMudGFza1RvQ3JlYXRlLnRleHQgPSAnJztcclxuXHJcbiAgICAgICAgdGhpcy50YXNrc01vZGVsLnNvcnRUYXNrcygpO1xyXG4gICAgfTtcclxufSIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEJyb3dzZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSAgIGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7IHRhc2tMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi90YXNrTGlzdC5jb21wb25lbnQnO1xyXG5cclxuaW1wb3J0IHsgUGlwZXNNb2R1bGUgfSBmcm9tICcuLy4uL3BpcGVzL3BpcGVzLm1vZHVsZSc7XHJcbmltcG9ydCB7IHRhc2tzTW9kZWxTZXJ2aWNlIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy90YXNrc01vZGVsLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBFdmVudHNTZXJ2aWNlIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy9ldmVudHMuc2VydmljZSc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW1xyXG4gICAgICAgIEJyb3dzZXJNb2R1bGUsXHJcbiAgICAgICAgRm9ybXNNb2R1bGUsXHJcbiAgICAgICAgUGlwZXNNb2R1bGVcclxuICAgIF0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFsgdGFza0xpc3RDb21wb25lbnQgXSxcclxuICAgIHByb3ZpZGVyczogWyB0YXNrc01vZGVsU2VydmljZSwgRXZlbnRzU2VydmljZSBdLFxyXG4gICAgZXhwb3J0czogWyB0YXNrTGlzdENvbXBvbmVudCBdLFxyXG4gICAgYm9vdHN0cmFwOiBbIHRhc2tMaXN0Q29tcG9uZW50IF1cclxufSlcclxuZXhwb3J0IGNsYXNzIHRhc2tMaXN0TW9kdWxlIHsgfSIsImltcG9ydCB7IHBsYXRmb3JtQnJvd3NlckR5bmFtaWMgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyLWR5bmFtaWMnO1xyXG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL3RvUHJvbWlzZSc7XHJcblxyXG5pbXBvcnQgeyBhcHBNb2R1bGUgfSBmcm9tICcuL2FwcENvbXBvbmVudC9hcHAubW9kdWxlJztcclxuXHJcbnBsYXRmb3JtQnJvd3NlckR5bmFtaWMoKS5ib290c3RyYXBNb2R1bGUoYXBwTW9kdWxlKTsiLCJcInVzZSBzdHJpY3RcIjtcbnZhciByb290XzEgPSByZXF1aXJlKCcuL3V0aWwvcm9vdCcpO1xudmFyIHRvU3Vic2NyaWJlcl8xID0gcmVxdWlyZSgnLi91dGlsL3RvU3Vic2NyaWJlcicpO1xudmFyIG9ic2VydmFibGVfMSA9IHJlcXVpcmUoJy4vc3ltYm9sL29ic2VydmFibGUnKTtcbi8qKlxuICogQSByZXByZXNlbnRhdGlvbiBvZiBhbnkgc2V0IG9mIHZhbHVlcyBvdmVyIGFueSBhbW91bnQgb2YgdGltZS4gVGhpcyB0aGUgbW9zdCBiYXNpYyBidWlsZGluZyBibG9ja1xuICogb2YgUnhKUy5cbiAqXG4gKiBAY2xhc3MgT2JzZXJ2YWJsZTxUPlxuICovXG52YXIgT2JzZXJ2YWJsZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gc3Vic2NyaWJlIHRoZSBmdW5jdGlvbiB0aGF0IGlzICBjYWxsZWQgd2hlbiB0aGUgT2JzZXJ2YWJsZSBpc1xuICAgICAqIGluaXRpYWxseSBzdWJzY3JpYmVkIHRvLiBUaGlzIGZ1bmN0aW9uIGlzIGdpdmVuIGEgU3Vic2NyaWJlciwgdG8gd2hpY2ggbmV3IHZhbHVlc1xuICAgICAqIGNhbiBiZSBgbmV4dGBlZCwgb3IgYW4gYGVycm9yYCBtZXRob2QgY2FuIGJlIGNhbGxlZCB0byByYWlzZSBhbiBlcnJvciwgb3JcbiAgICAgKiBgY29tcGxldGVgIGNhbiBiZSBjYWxsZWQgdG8gbm90aWZ5IG9mIGEgc3VjY2Vzc2Z1bCBjb21wbGV0aW9uLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIE9ic2VydmFibGUoc3Vic2NyaWJlKSB7XG4gICAgICAgIHRoaXMuX2lzU2NhbGFyID0gZmFsc2U7XG4gICAgICAgIGlmIChzdWJzY3JpYmUpIHtcbiAgICAgICAgICAgIHRoaXMuX3N1YnNjcmliZSA9IHN1YnNjcmliZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IE9ic2VydmFibGUsIHdpdGggdGhpcyBPYnNlcnZhYmxlIGFzIHRoZSBzb3VyY2UsIGFuZCB0aGUgcGFzc2VkXG4gICAgICogb3BlcmF0b3IgZGVmaW5lZCBhcyB0aGUgbmV3IG9ic2VydmFibGUncyBvcGVyYXRvci5cbiAgICAgKiBAbWV0aG9kIGxpZnRcbiAgICAgKiBAcGFyYW0ge09wZXJhdG9yfSBvcGVyYXRvciB0aGUgb3BlcmF0b3IgZGVmaW5pbmcgdGhlIG9wZXJhdGlvbiB0byB0YWtlIG9uIHRoZSBvYnNlcnZhYmxlXG4gICAgICogQHJldHVybiB7T2JzZXJ2YWJsZX0gYSBuZXcgb2JzZXJ2YWJsZSB3aXRoIHRoZSBPcGVyYXRvciBhcHBsaWVkXG4gICAgICovXG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUubGlmdCA9IGZ1bmN0aW9uIChvcGVyYXRvcikge1xuICAgICAgICB2YXIgb2JzZXJ2YWJsZSA9IG5ldyBPYnNlcnZhYmxlKCk7XG4gICAgICAgIG9ic2VydmFibGUuc291cmNlID0gdGhpcztcbiAgICAgICAgb2JzZXJ2YWJsZS5vcGVyYXRvciA9IG9wZXJhdG9yO1xuICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZTtcbiAgICB9O1xuICAgIE9ic2VydmFibGUucHJvdG90eXBlLnN1YnNjcmliZSA9IGZ1bmN0aW9uIChvYnNlcnZlck9yTmV4dCwgZXJyb3IsIGNvbXBsZXRlKSB7XG4gICAgICAgIHZhciBvcGVyYXRvciA9IHRoaXMub3BlcmF0b3I7XG4gICAgICAgIHZhciBzaW5rID0gdG9TdWJzY3JpYmVyXzEudG9TdWJzY3JpYmVyKG9ic2VydmVyT3JOZXh0LCBlcnJvciwgY29tcGxldGUpO1xuICAgICAgICBpZiAob3BlcmF0b3IpIHtcbiAgICAgICAgICAgIG9wZXJhdG9yLmNhbGwoc2luaywgdGhpcy5zb3VyY2UpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc2luay5hZGQodGhpcy5fc3Vic2NyaWJlKHNpbmspKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2luay5zeW5jRXJyb3JUaHJvd2FibGUpIHtcbiAgICAgICAgICAgIHNpbmsuc3luY0Vycm9yVGhyb3dhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAoc2luay5zeW5jRXJyb3JUaHJvd24pIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBzaW5rLnN5bmNFcnJvclZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzaW5rO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBmb3JFYWNoXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gbmV4dCBhIGhhbmRsZXIgZm9yIGVhY2ggdmFsdWUgZW1pdHRlZCBieSB0aGUgb2JzZXJ2YWJsZVxuICAgICAqIEBwYXJhbSB7UHJvbWlzZUNvbnN0cnVjdG9yfSBbUHJvbWlzZUN0b3JdIGEgY29uc3RydWN0b3IgZnVuY3Rpb24gdXNlZCB0byBpbnN0YW50aWF0ZSB0aGUgUHJvbWlzZVxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9IGEgcHJvbWlzZSB0aGF0IGVpdGhlciByZXNvbHZlcyBvbiBvYnNlcnZhYmxlIGNvbXBsZXRpb24gb3JcbiAgICAgKiAgcmVqZWN0cyB3aXRoIHRoZSBoYW5kbGVkIGVycm9yXG4gICAgICovXG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIChuZXh0LCBQcm9taXNlQ3Rvcikge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAoIVByb21pc2VDdG9yKSB7XG4gICAgICAgICAgICBpZiAocm9vdF8xLnJvb3QuUnggJiYgcm9vdF8xLnJvb3QuUnguY29uZmlnICYmIHJvb3RfMS5yb290LlJ4LmNvbmZpZy5Qcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgUHJvbWlzZUN0b3IgPSByb290XzEucm9vdC5SeC5jb25maWcuUHJvbWlzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHJvb3RfMS5yb290LlByb21pc2UpIHtcbiAgICAgICAgICAgICAgICBQcm9taXNlQ3RvciA9IHJvb3RfMS5yb290LlByb21pc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFQcm9taXNlQ3Rvcikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdubyBQcm9taXNlIGltcGwgZm91bmQnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2VDdG9yKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIHZhciBzdWJzY3JpcHRpb24gPSBfdGhpcy5zdWJzY3JpYmUoZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGVyZSBpcyBhIHN1YnNjcmlwdGlvbiwgdGhlbiB3ZSBjYW4gc3VybWlzZVxuICAgICAgICAgICAgICAgICAgICAvLyB0aGUgbmV4dCBoYW5kbGluZyBpcyBhc3luY2hyb25vdXMuIEFueSBlcnJvcnMgdGhyb3duXG4gICAgICAgICAgICAgICAgICAgIC8vIG5lZWQgdG8gYmUgcmVqZWN0ZWQgZXhwbGljaXRseSBhbmQgdW5zdWJzY3JpYmUgbXVzdCBiZVxuICAgICAgICAgICAgICAgICAgICAvLyBjYWxsZWQgbWFudWFsbHlcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHQodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoZXJlIGlzIE5PIHN1YnNjcmlwdGlvbiwgdGhlbiB3ZSdyZSBnZXR0aW5nIGEgbmV4dGVkXG4gICAgICAgICAgICAgICAgICAgIC8vIHZhbHVlIHN5bmNocm9ub3VzbHkgZHVyaW5nIHN1YnNjcmlwdGlvbi4gV2UgY2FuIGp1c3QgY2FsbCBpdC5cbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgaXQgZXJyb3JzLCBPYnNlcnZhYmxlJ3MgYHN1YnNjcmliZWAgd2lsbCBlbnN1cmUgdGhlXG4gICAgICAgICAgICAgICAgICAgIC8vIHVuc3Vic2NyaXB0aW9uIGxvZ2ljIGlzIGNhbGxlZCwgdGhlbiBzeW5jaHJvbm91c2x5IHJldGhyb3cgdGhlIGVycm9yLlxuICAgICAgICAgICAgICAgICAgICAvLyBBZnRlciB0aGF0LCBQcm9taXNlIHdpbGwgdHJhcCB0aGUgZXJyb3IgYW5kIHNlbmQgaXRcbiAgICAgICAgICAgICAgICAgICAgLy8gZG93biB0aGUgcmVqZWN0aW9uIHBhdGguXG4gICAgICAgICAgICAgICAgICAgIG5leHQodmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIHJlamVjdCwgcmVzb2x2ZSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUuX3N1YnNjcmliZSA9IGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNvdXJjZS5zdWJzY3JpYmUoc3Vic2NyaWJlcik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBBbiBpbnRlcm9wIHBvaW50IGRlZmluZWQgYnkgdGhlIGVzNy1vYnNlcnZhYmxlIHNwZWMgaHR0cHM6Ly9naXRodWIuY29tL3plbnBhcnNpbmcvZXMtb2JzZXJ2YWJsZVxuICAgICAqIEBtZXRob2QgU3ltYm9sLm9ic2VydmFibGVcbiAgICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSB0aGlzIGluc3RhbmNlIG9mIHRoZSBvYnNlcnZhYmxlXG4gICAgICovXG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGVbb2JzZXJ2YWJsZV8xLiQkb2JzZXJ2YWJsZV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgLy8gSEFDSzogU2luY2UgVHlwZVNjcmlwdCBpbmhlcml0cyBzdGF0aWMgcHJvcGVydGllcyB0b28sIHdlIGhhdmUgdG9cbiAgICAvLyBmaWdodCBhZ2FpbnN0IFR5cGVTY3JpcHQgaGVyZSBzbyBTdWJqZWN0IGNhbiBoYXZlIGEgZGlmZmVyZW50IHN0YXRpYyBjcmVhdGUgc2lnbmF0dXJlXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBjb2xkIE9ic2VydmFibGUgYnkgY2FsbGluZyB0aGUgT2JzZXJ2YWJsZSBjb25zdHJ1Y3RvclxuICAgICAqIEBzdGF0aWMgdHJ1ZVxuICAgICAqIEBvd25lciBPYnNlcnZhYmxlXG4gICAgICogQG1ldGhvZCBjcmVhdGVcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBzdWJzY3JpYmU/IHRoZSBzdWJzY3JpYmVyIGZ1bmN0aW9uIHRvIGJlIHBhc3NlZCB0byB0aGUgT2JzZXJ2YWJsZSBjb25zdHJ1Y3RvclxuICAgICAqIEByZXR1cm4ge09ic2VydmFibGV9IGEgbmV3IGNvbGQgb2JzZXJ2YWJsZVxuICAgICAqL1xuICAgIE9ic2VydmFibGUuY3JlYXRlID0gZnVuY3Rpb24gKHN1YnNjcmliZSkge1xuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoc3Vic2NyaWJlKTtcbiAgICB9O1xuICAgIHJldHVybiBPYnNlcnZhYmxlO1xufSgpKTtcbmV4cG9ydHMuT2JzZXJ2YWJsZSA9IE9ic2VydmFibGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1PYnNlcnZhYmxlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuZXhwb3J0cy5lbXB0eSA9IHtcbiAgICBjbG9zZWQ6IHRydWUsXG4gICAgbmV4dDogZnVuY3Rpb24gKHZhbHVlKSB7IH0sXG4gICAgZXJyb3I6IGZ1bmN0aW9uIChlcnIpIHsgdGhyb3cgZXJyOyB9LFxuICAgIGNvbXBsZXRlOiBmdW5jdGlvbiAoKSB7IH1cbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1PYnNlcnZlci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59O1xudmFyIGlzRnVuY3Rpb25fMSA9IHJlcXVpcmUoJy4vdXRpbC9pc0Z1bmN0aW9uJyk7XG52YXIgU3Vic2NyaXB0aW9uXzEgPSByZXF1aXJlKCcuL1N1YnNjcmlwdGlvbicpO1xudmFyIE9ic2VydmVyXzEgPSByZXF1aXJlKCcuL09ic2VydmVyJyk7XG52YXIgcnhTdWJzY3JpYmVyXzEgPSByZXF1aXJlKCcuL3N5bWJvbC9yeFN1YnNjcmliZXInKTtcbi8qKlxuICogSW1wbGVtZW50cyB0aGUge0BsaW5rIE9ic2VydmVyfSBpbnRlcmZhY2UgYW5kIGV4dGVuZHMgdGhlXG4gKiB7QGxpbmsgU3Vic2NyaXB0aW9ufSBjbGFzcy4gV2hpbGUgdGhlIHtAbGluayBPYnNlcnZlcn0gaXMgdGhlIHB1YmxpYyBBUEkgZm9yXG4gKiBjb25zdW1pbmcgdGhlIHZhbHVlcyBvZiBhbiB7QGxpbmsgT2JzZXJ2YWJsZX0sIGFsbCBPYnNlcnZlcnMgZ2V0IGNvbnZlcnRlZCB0b1xuICogYSBTdWJzY3JpYmVyLCBpbiBvcmRlciB0byBwcm92aWRlIFN1YnNjcmlwdGlvbi1saWtlIGNhcGFiaWxpdGllcyBzdWNoIGFzXG4gKiBgdW5zdWJzY3JpYmVgLiBTdWJzY3JpYmVyIGlzIGEgY29tbW9uIHR5cGUgaW4gUnhKUywgYW5kIGNydWNpYWwgZm9yXG4gKiBpbXBsZW1lbnRpbmcgb3BlcmF0b3JzLCBidXQgaXQgaXMgcmFyZWx5IHVzZWQgYXMgYSBwdWJsaWMgQVBJLlxuICpcbiAqIEBjbGFzcyBTdWJzY3JpYmVyPFQ+XG4gKi9cbnZhciBTdWJzY3JpYmVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoU3Vic2NyaWJlciwgX3N1cGVyKTtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge09ic2VydmVyfGZ1bmN0aW9uKHZhbHVlOiBUKTogdm9pZH0gW2Rlc3RpbmF0aW9uT3JOZXh0XSBBIHBhcnRpYWxseVxuICAgICAqIGRlZmluZWQgT2JzZXJ2ZXIgb3IgYSBgbmV4dGAgY2FsbGJhY2sgZnVuY3Rpb24uXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbihlOiA/YW55KTogdm9pZH0gW2Vycm9yXSBUaGUgYGVycm9yYCBjYWxsYmFjayBvZiBhblxuICAgICAqIE9ic2VydmVyLlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oKTogdm9pZH0gW2NvbXBsZXRlXSBUaGUgYGNvbXBsZXRlYCBjYWxsYmFjayBvZiBhblxuICAgICAqIE9ic2VydmVyLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIFN1YnNjcmliZXIoZGVzdGluYXRpb25Pck5leHQsIGVycm9yLCBjb21wbGV0ZSkge1xuICAgICAgICBfc3VwZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgdGhpcy5zeW5jRXJyb3JWYWx1ZSA9IG51bGw7XG4gICAgICAgIHRoaXMuc3luY0Vycm9yVGhyb3duID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc3luY0Vycm9yVGhyb3dhYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNTdG9wcGVkID0gZmFsc2U7XG4gICAgICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHRoaXMuZGVzdGluYXRpb24gPSBPYnNlcnZlcl8xLmVtcHR5O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIGlmICghZGVzdGluYXRpb25Pck5leHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXN0aW5hdGlvbiA9IE9ic2VydmVyXzEuZW1wdHk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGRlc3RpbmF0aW9uT3JOZXh0ID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGVzdGluYXRpb25Pck5leHQgaW5zdGFuY2VvZiBTdWJzY3JpYmVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uID0gZGVzdGluYXRpb25Pck5leHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLmFkZCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3luY0Vycm9yVGhyb3dhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVzdGluYXRpb24gPSBuZXcgU2FmZVN1YnNjcmliZXIodGhpcywgZGVzdGluYXRpb25Pck5leHQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhpcy5zeW5jRXJyb3JUaHJvd2FibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuZGVzdGluYXRpb24gPSBuZXcgU2FmZVN1YnNjcmliZXIodGhpcywgZGVzdGluYXRpb25Pck5leHQsIGVycm9yLCBjb21wbGV0ZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgU3Vic2NyaWJlci5wcm90b3R5cGVbcnhTdWJzY3JpYmVyXzEuJCRyeFN1YnNjcmliZXJdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfTtcbiAgICAvKipcbiAgICAgKiBBIHN0YXRpYyBmYWN0b3J5IGZvciBhIFN1YnNjcmliZXIsIGdpdmVuIGEgKHBvdGVudGlhbGx5IHBhcnRpYWwpIGRlZmluaXRpb25cbiAgICAgKiBvZiBhbiBPYnNlcnZlci5cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKHg6ID9UKTogdm9pZH0gW25leHRdIFRoZSBgbmV4dGAgY2FsbGJhY2sgb2YgYW4gT2JzZXJ2ZXIuXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbihlOiA/YW55KTogdm9pZH0gW2Vycm9yXSBUaGUgYGVycm9yYCBjYWxsYmFjayBvZiBhblxuICAgICAqIE9ic2VydmVyLlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oKTogdm9pZH0gW2NvbXBsZXRlXSBUaGUgYGNvbXBsZXRlYCBjYWxsYmFjayBvZiBhblxuICAgICAqIE9ic2VydmVyLlxuICAgICAqIEByZXR1cm4ge1N1YnNjcmliZXI8VD59IEEgU3Vic2NyaWJlciB3cmFwcGluZyB0aGUgKHBhcnRpYWxseSBkZWZpbmVkKVxuICAgICAqIE9ic2VydmVyIHJlcHJlc2VudGVkIGJ5IHRoZSBnaXZlbiBhcmd1bWVudHMuXG4gICAgICovXG4gICAgU3Vic2NyaWJlci5jcmVhdGUgPSBmdW5jdGlvbiAobmV4dCwgZXJyb3IsIGNvbXBsZXRlKSB7XG4gICAgICAgIHZhciBzdWJzY3JpYmVyID0gbmV3IFN1YnNjcmliZXIobmV4dCwgZXJyb3IsIGNvbXBsZXRlKTtcbiAgICAgICAgc3Vic2NyaWJlci5zeW5jRXJyb3JUaHJvd2FibGUgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIHN1YnNjcmliZXI7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUaGUge0BsaW5rIE9ic2VydmVyfSBjYWxsYmFjayB0byByZWNlaXZlIG5vdGlmaWNhdGlvbnMgb2YgdHlwZSBgbmV4dGAgZnJvbVxuICAgICAqIHRoZSBPYnNlcnZhYmxlLCB3aXRoIGEgdmFsdWUuIFRoZSBPYnNlcnZhYmxlIG1heSBjYWxsIHRoaXMgbWV0aG9kIDAgb3IgbW9yZVxuICAgICAqIHRpbWVzLlxuICAgICAqIEBwYXJhbSB7VH0gW3ZhbHVlXSBUaGUgYG5leHRgIHZhbHVlLlxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgU3Vic2NyaWJlci5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBpZiAoIXRoaXMuaXNTdG9wcGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9uZXh0KHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhlIHtAbGluayBPYnNlcnZlcn0gY2FsbGJhY2sgdG8gcmVjZWl2ZSBub3RpZmljYXRpb25zIG9mIHR5cGUgYGVycm9yYCBmcm9tXG4gICAgICogdGhlIE9ic2VydmFibGUsIHdpdGggYW4gYXR0YWNoZWQge0BsaW5rIEVycm9yfS4gTm90aWZpZXMgdGhlIE9ic2VydmVyIHRoYXRcbiAgICAgKiB0aGUgT2JzZXJ2YWJsZSBoYXMgZXhwZXJpZW5jZWQgYW4gZXJyb3IgY29uZGl0aW9uLlxuICAgICAqIEBwYXJhbSB7YW55fSBbZXJyXSBUaGUgYGVycm9yYCBleGNlcHRpb24uXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBTdWJzY3JpYmVyLnByb3RvdHlwZS5lcnJvciA9IGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzU3RvcHBlZCkge1xuICAgICAgICAgICAgdGhpcy5pc1N0b3BwZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5fZXJyb3IoZXJyKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhlIHtAbGluayBPYnNlcnZlcn0gY2FsbGJhY2sgdG8gcmVjZWl2ZSBhIHZhbHVlbGVzcyBub3RpZmljYXRpb24gb2YgdHlwZVxuICAgICAqIGBjb21wbGV0ZWAgZnJvbSB0aGUgT2JzZXJ2YWJsZS4gTm90aWZpZXMgdGhlIE9ic2VydmVyIHRoYXQgdGhlIE9ic2VydmFibGVcbiAgICAgKiBoYXMgZmluaXNoZWQgc2VuZGluZyBwdXNoLWJhc2VkIG5vdGlmaWNhdGlvbnMuXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBTdWJzY3JpYmVyLnByb3RvdHlwZS5jb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzU3RvcHBlZCkge1xuICAgICAgICAgICAgdGhpcy5pc1N0b3BwZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5fY29tcGxldGUoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU3Vic2NyaWJlci5wcm90b3R5cGUudW5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmNsb3NlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaXNTdG9wcGVkID0gdHJ1ZTtcbiAgICAgICAgX3N1cGVyLnByb3RvdHlwZS51bnN1YnNjcmliZS5jYWxsKHRoaXMpO1xuICAgIH07XG4gICAgU3Vic2NyaWJlci5wcm90b3R5cGUuX25leHQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5uZXh0KHZhbHVlKTtcbiAgICB9O1xuICAgIFN1YnNjcmliZXIucHJvdG90eXBlLl9lcnJvciA9IGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5lcnJvcihlcnIpO1xuICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgfTtcbiAgICBTdWJzY3JpYmVyLnByb3RvdHlwZS5fY29tcGxldGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuZGVzdGluYXRpb24uY29tcGxldGUoKTtcbiAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgIH07XG4gICAgcmV0dXJuIFN1YnNjcmliZXI7XG59KFN1YnNjcmlwdGlvbl8xLlN1YnNjcmlwdGlvbikpO1xuZXhwb3J0cy5TdWJzY3JpYmVyID0gU3Vic2NyaWJlcjtcbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBpZ25vcmVcbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICovXG52YXIgU2FmZVN1YnNjcmliZXIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhTYWZlU3Vic2NyaWJlciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBTYWZlU3Vic2NyaWJlcihfcGFyZW50LCBvYnNlcnZlck9yTmV4dCwgZXJyb3IsIGNvbXBsZXRlKSB7XG4gICAgICAgIF9zdXBlci5jYWxsKHRoaXMpO1xuICAgICAgICB0aGlzLl9wYXJlbnQgPSBfcGFyZW50O1xuICAgICAgICB2YXIgbmV4dDtcbiAgICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgICAgICBpZiAoaXNGdW5jdGlvbl8xLmlzRnVuY3Rpb24ob2JzZXJ2ZXJPck5leHQpKSB7XG4gICAgICAgICAgICBuZXh0ID0gb2JzZXJ2ZXJPck5leHQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAob2JzZXJ2ZXJPck5leHQpIHtcbiAgICAgICAgICAgIGNvbnRleHQgPSBvYnNlcnZlck9yTmV4dDtcbiAgICAgICAgICAgIG5leHQgPSBvYnNlcnZlck9yTmV4dC5uZXh0O1xuICAgICAgICAgICAgZXJyb3IgPSBvYnNlcnZlck9yTmV4dC5lcnJvcjtcbiAgICAgICAgICAgIGNvbXBsZXRlID0gb2JzZXJ2ZXJPck5leHQuY29tcGxldGU7XG4gICAgICAgICAgICBpZiAoaXNGdW5jdGlvbl8xLmlzRnVuY3Rpb24oY29udGV4dC51bnN1YnNjcmliZSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZChjb250ZXh0LnVuc3Vic2NyaWJlLmJpbmQoY29udGV4dCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29udGV4dC51bnN1YnNjcmliZSA9IHRoaXMudW5zdWJzY3JpYmUuYmluZCh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jb250ZXh0ID0gY29udGV4dDtcbiAgICAgICAgdGhpcy5fbmV4dCA9IG5leHQ7XG4gICAgICAgIHRoaXMuX2Vycm9yID0gZXJyb3I7XG4gICAgICAgIHRoaXMuX2NvbXBsZXRlID0gY29tcGxldGU7XG4gICAgfVxuICAgIFNhZmVTdWJzY3JpYmVyLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIGlmICghdGhpcy5pc1N0b3BwZWQgJiYgdGhpcy5fbmV4dCkge1xuICAgICAgICAgICAgdmFyIF9wYXJlbnQgPSB0aGlzLl9wYXJlbnQ7XG4gICAgICAgICAgICBpZiAoIV9wYXJlbnQuc3luY0Vycm9yVGhyb3dhYmxlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fX3RyeU9yVW5zdWIodGhpcy5fbmV4dCwgdmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5fX3RyeU9yU2V0RXJyb3IoX3BhcmVudCwgdGhpcy5fbmV4dCwgdmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBTYWZlU3Vic2NyaWJlci5wcm90b3R5cGUuZXJyb3IgPSBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIGlmICghdGhpcy5pc1N0b3BwZWQpIHtcbiAgICAgICAgICAgIHZhciBfcGFyZW50ID0gdGhpcy5fcGFyZW50O1xuICAgICAgICAgICAgaWYgKHRoaXMuX2Vycm9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFfcGFyZW50LnN5bmNFcnJvclRocm93YWJsZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9fdHJ5T3JVbnN1Yih0aGlzLl9lcnJvciwgZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fX3RyeU9yU2V0RXJyb3IoX3BhcmVudCwgdGhpcy5fZXJyb3IsIGVycik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghX3BhcmVudC5zeW5jRXJyb3JUaHJvd2FibGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgX3BhcmVudC5zeW5jRXJyb3JWYWx1ZSA9IGVycjtcbiAgICAgICAgICAgICAgICBfcGFyZW50LnN5bmNFcnJvclRocm93biA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBTYWZlU3Vic2NyaWJlci5wcm90b3R5cGUuY29tcGxldGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGhpcy5pc1N0b3BwZWQpIHtcbiAgICAgICAgICAgIHZhciBfcGFyZW50ID0gdGhpcy5fcGFyZW50O1xuICAgICAgICAgICAgaWYgKHRoaXMuX2NvbXBsZXRlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFfcGFyZW50LnN5bmNFcnJvclRocm93YWJsZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9fdHJ5T3JVbnN1Yih0aGlzLl9jb21wbGV0ZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX190cnlPclNldEVycm9yKF9wYXJlbnQsIHRoaXMuX2NvbXBsZXRlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgU2FmZVN1YnNjcmliZXIucHJvdG90eXBlLl9fdHJ5T3JVbnN1YiA9IGZ1bmN0aW9uIChmbiwgdmFsdWUpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZuLmNhbGwodGhpcy5fY29udGV4dCwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU2FmZVN1YnNjcmliZXIucHJvdG90eXBlLl9fdHJ5T3JTZXRFcnJvciA9IGZ1bmN0aW9uIChwYXJlbnQsIGZuLCB2YWx1ZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZm4uY2FsbCh0aGlzLl9jb250ZXh0LCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcGFyZW50LnN5bmNFcnJvclZhbHVlID0gZXJyO1xuICAgICAgICAgICAgcGFyZW50LnN5bmNFcnJvclRocm93biA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgICBTYWZlU3Vic2NyaWJlci5wcm90b3R5cGUuX3Vuc3Vic2NyaWJlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3BhcmVudCA9IHRoaXMuX3BhcmVudDtcbiAgICAgICAgdGhpcy5fY29udGV4dCA9IG51bGw7XG4gICAgICAgIHRoaXMuX3BhcmVudCA9IG51bGw7XG4gICAgICAgIF9wYXJlbnQudW5zdWJzY3JpYmUoKTtcbiAgICB9O1xuICAgIHJldHVybiBTYWZlU3Vic2NyaWJlcjtcbn0oU3Vic2NyaWJlcikpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9U3Vic2NyaWJlci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBpc0FycmF5XzEgPSByZXF1aXJlKCcuL3V0aWwvaXNBcnJheScpO1xudmFyIGlzT2JqZWN0XzEgPSByZXF1aXJlKCcuL3V0aWwvaXNPYmplY3QnKTtcbnZhciBpc0Z1bmN0aW9uXzEgPSByZXF1aXJlKCcuL3V0aWwvaXNGdW5jdGlvbicpO1xudmFyIHRyeUNhdGNoXzEgPSByZXF1aXJlKCcuL3V0aWwvdHJ5Q2F0Y2gnKTtcbnZhciBlcnJvck9iamVjdF8xID0gcmVxdWlyZSgnLi91dGlsL2Vycm9yT2JqZWN0Jyk7XG52YXIgVW5zdWJzY3JpcHRpb25FcnJvcl8xID0gcmVxdWlyZSgnLi91dGlsL1Vuc3Vic2NyaXB0aW9uRXJyb3InKTtcbi8qKlxuICogUmVwcmVzZW50cyBhIGRpc3Bvc2FibGUgcmVzb3VyY2UsIHN1Y2ggYXMgdGhlIGV4ZWN1dGlvbiBvZiBhbiBPYnNlcnZhYmxlLiBBXG4gKiBTdWJzY3JpcHRpb24gaGFzIG9uZSBpbXBvcnRhbnQgbWV0aG9kLCBgdW5zdWJzY3JpYmVgLCB0aGF0IHRha2VzIG5vIGFyZ3VtZW50XG4gKiBhbmQganVzdCBkaXNwb3NlcyB0aGUgcmVzb3VyY2UgaGVsZCBieSB0aGUgc3Vic2NyaXB0aW9uLlxuICpcbiAqIEFkZGl0aW9uYWxseSwgc3Vic2NyaXB0aW9ucyBtYXkgYmUgZ3JvdXBlZCB0b2dldGhlciB0aHJvdWdoIHRoZSBgYWRkKClgXG4gKiBtZXRob2QsIHdoaWNoIHdpbGwgYXR0YWNoIGEgY2hpbGQgU3Vic2NyaXB0aW9uIHRvIHRoZSBjdXJyZW50IFN1YnNjcmlwdGlvbi5cbiAqIFdoZW4gYSBTdWJzY3JpcHRpb24gaXMgdW5zdWJzY3JpYmVkLCBhbGwgaXRzIGNoaWxkcmVuIChhbmQgaXRzIGdyYW5kY2hpbGRyZW4pXG4gKiB3aWxsIGJlIHVuc3Vic2NyaWJlZCBhcyB3ZWxsLlxuICpcbiAqIEBjbGFzcyBTdWJzY3JpcHRpb25cbiAqL1xudmFyIFN1YnNjcmlwdGlvbiA9IChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbigpOiB2b2lkfSBbdW5zdWJzY3JpYmVdIEEgZnVuY3Rpb24gZGVzY3JpYmluZyBob3cgdG9cbiAgICAgKiBwZXJmb3JtIHRoZSBkaXNwb3NhbCBvZiByZXNvdXJjZXMgd2hlbiB0aGUgYHVuc3Vic2NyaWJlYCBtZXRob2QgaXMgY2FsbGVkLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIFN1YnNjcmlwdGlvbih1bnN1YnNjcmliZSkge1xuICAgICAgICAvKipcbiAgICAgICAgICogQSBmbGFnIHRvIGluZGljYXRlIHdoZXRoZXIgdGhpcyBTdWJzY3JpcHRpb24gaGFzIGFscmVhZHkgYmVlbiB1bnN1YnNjcmliZWQuXG4gICAgICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5jbG9zZWQgPSBmYWxzZTtcbiAgICAgICAgaWYgKHVuc3Vic2NyaWJlKSB7XG4gICAgICAgICAgICB0aGlzLl91bnN1YnNjcmliZSA9IHVuc3Vic2NyaWJlO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERpc3Bvc2VzIHRoZSByZXNvdXJjZXMgaGVsZCBieSB0aGUgc3Vic2NyaXB0aW9uLiBNYXksIGZvciBpbnN0YW5jZSwgY2FuY2VsXG4gICAgICogYW4gb25nb2luZyBPYnNlcnZhYmxlIGV4ZWN1dGlvbiBvciBjYW5jZWwgYW55IG90aGVyIHR5cGUgb2Ygd29yayB0aGF0XG4gICAgICogc3RhcnRlZCB3aGVuIHRoZSBTdWJzY3JpcHRpb24gd2FzIGNyZWF0ZWQuXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBTdWJzY3JpcHRpb24ucHJvdG90eXBlLnVuc3Vic2NyaWJlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgaGFzRXJyb3JzID0gZmFsc2U7XG4gICAgICAgIHZhciBlcnJvcnM7XG4gICAgICAgIGlmICh0aGlzLmNsb3NlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2xvc2VkID0gdHJ1ZTtcbiAgICAgICAgdmFyIF9hID0gdGhpcywgX3Vuc3Vic2NyaWJlID0gX2EuX3Vuc3Vic2NyaWJlLCBfc3Vic2NyaXB0aW9ucyA9IF9hLl9zdWJzY3JpcHRpb25zO1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb25zID0gbnVsbDtcbiAgICAgICAgaWYgKGlzRnVuY3Rpb25fMS5pc0Z1bmN0aW9uKF91bnN1YnNjcmliZSkpIHtcbiAgICAgICAgICAgIHZhciB0cmlhbCA9IHRyeUNhdGNoXzEudHJ5Q2F0Y2goX3Vuc3Vic2NyaWJlKS5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgaWYgKHRyaWFsID09PSBlcnJvck9iamVjdF8xLmVycm9yT2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgaGFzRXJyb3JzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAoZXJyb3JzID0gZXJyb3JzIHx8IFtdKS5wdXNoKGVycm9yT2JqZWN0XzEuZXJyb3JPYmplY3QuZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzQXJyYXlfMS5pc0FycmF5KF9zdWJzY3JpcHRpb25zKSkge1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gLTE7XG4gICAgICAgICAgICB2YXIgbGVuID0gX3N1YnNjcmlwdGlvbnMubGVuZ3RoO1xuICAgICAgICAgICAgd2hpbGUgKCsraW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgICAgICB2YXIgc3ViID0gX3N1YnNjcmlwdGlvbnNbaW5kZXhdO1xuICAgICAgICAgICAgICAgIGlmIChpc09iamVjdF8xLmlzT2JqZWN0KHN1YikpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRyaWFsID0gdHJ5Q2F0Y2hfMS50cnlDYXRjaChzdWIudW5zdWJzY3JpYmUpLmNhbGwoc3ViKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRyaWFsID09PSBlcnJvck9iamVjdF8xLmVycm9yT2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYXNFcnJvcnMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JzID0gZXJyb3JzIHx8IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVyciA9IGVycm9yT2JqZWN0XzEuZXJyb3JPYmplY3QuZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnIgaW5zdGFuY2VvZiBVbnN1YnNjcmlwdGlvbkVycm9yXzEuVW5zdWJzY3JpcHRpb25FcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9ycyA9IGVycm9ycy5jb25jYXQoZXJyLmVycm9ycyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcnMucHVzaChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChoYXNFcnJvcnMpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBVbnN1YnNjcmlwdGlvbkVycm9yXzEuVW5zdWJzY3JpcHRpb25FcnJvcihlcnJvcnMpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBBZGRzIGEgdGVhciBkb3duIHRvIGJlIGNhbGxlZCBkdXJpbmcgdGhlIHVuc3Vic2NyaWJlKCkgb2YgdGhpc1xuICAgICAqIFN1YnNjcmlwdGlvbi5cbiAgICAgKlxuICAgICAqIElmIHRoZSB0ZWFyIGRvd24gYmVpbmcgYWRkZWQgaXMgYSBzdWJzY3JpcHRpb24gdGhhdCBpcyBhbHJlYWR5XG4gICAgICogdW5zdWJzY3JpYmVkLCBpcyB0aGUgc2FtZSByZWZlcmVuY2UgYGFkZGAgaXMgYmVpbmcgY2FsbGVkIG9uLCBvciBpc1xuICAgICAqIGBTdWJzY3JpcHRpb24uRU1QVFlgLCBpdCB3aWxsIG5vdCBiZSBhZGRlZC5cbiAgICAgKlxuICAgICAqIElmIHRoaXMgc3Vic2NyaXB0aW9uIGlzIGFscmVhZHkgaW4gYW4gYGNsb3NlZGAgc3RhdGUsIHRoZSBwYXNzZWRcbiAgICAgKiB0ZWFyIGRvd24gbG9naWMgd2lsbCBiZSBleGVjdXRlZCBpbW1lZGlhdGVseS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7VGVhcmRvd25Mb2dpY30gdGVhcmRvd24gVGhlIGFkZGl0aW9uYWwgbG9naWMgdG8gZXhlY3V0ZSBvblxuICAgICAqIHRlYXJkb3duLlxuICAgICAqIEByZXR1cm4ge1N1YnNjcmlwdGlvbn0gUmV0dXJucyB0aGUgU3Vic2NyaXB0aW9uIHVzZWQgb3IgY3JlYXRlZCB0byBiZVxuICAgICAqIGFkZGVkIHRvIHRoZSBpbm5lciBzdWJzY3JpcHRpb25zIGxpc3QuIFRoaXMgU3Vic2NyaXB0aW9uIGNhbiBiZSB1c2VkIHdpdGhcbiAgICAgKiBgcmVtb3ZlKClgIHRvIHJlbW92ZSB0aGUgcGFzc2VkIHRlYXJkb3duIGxvZ2ljIGZyb20gdGhlIGlubmVyIHN1YnNjcmlwdGlvbnNcbiAgICAgKiBsaXN0LlxuICAgICAqL1xuICAgIFN1YnNjcmlwdGlvbi5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKHRlYXJkb3duKSB7XG4gICAgICAgIGlmICghdGVhcmRvd24gfHwgKHRlYXJkb3duID09PSBTdWJzY3JpcHRpb24uRU1QVFkpKSB7XG4gICAgICAgICAgICByZXR1cm4gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0ZWFyZG93biA9PT0gdGhpcykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHN1YiA9IHRlYXJkb3duO1xuICAgICAgICBzd2l0Y2ggKHR5cGVvZiB0ZWFyZG93bikge1xuICAgICAgICAgICAgY2FzZSAnZnVuY3Rpb24nOlxuICAgICAgICAgICAgICAgIHN1YiA9IG5ldyBTdWJzY3JpcHRpb24odGVhcmRvd24pO1xuICAgICAgICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgICAgICAgICBpZiAoc3ViLmNsb3NlZCB8fCB0eXBlb2Ygc3ViLnVuc3Vic2NyaWJlICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmNsb3NlZCkge1xuICAgICAgICAgICAgICAgICAgICBzdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICh0aGlzLl9zdWJzY3JpcHRpb25zIHx8ICh0aGlzLl9zdWJzY3JpcHRpb25zID0gW10pKS5wdXNoKHN1Yik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3VucmVjb2duaXplZCB0ZWFyZG93biAnICsgdGVhcmRvd24gKyAnIGFkZGVkIHRvIFN1YnNjcmlwdGlvbi4nKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3ViO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhIFN1YnNjcmlwdGlvbiBmcm9tIHRoZSBpbnRlcm5hbCBsaXN0IG9mIHN1YnNjcmlwdGlvbnMgdGhhdCB3aWxsXG4gICAgICogdW5zdWJzY3JpYmUgZHVyaW5nIHRoZSB1bnN1YnNjcmliZSBwcm9jZXNzIG9mIHRoaXMgU3Vic2NyaXB0aW9uLlxuICAgICAqIEBwYXJhbSB7U3Vic2NyaXB0aW9ufSBzdWJzY3JpcHRpb24gVGhlIHN1YnNjcmlwdGlvbiB0byByZW1vdmUuXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBTdWJzY3JpcHRpb24ucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIChzdWJzY3JpcHRpb24pIHtcbiAgICAgICAgLy8gSEFDSzogVGhpcyBtaWdodCBiZSByZWR1bmRhbnQgYmVjYXVzZSBvZiB0aGUgbG9naWMgaW4gYGFkZCgpYFxuICAgICAgICBpZiAoc3Vic2NyaXB0aW9uID09IG51bGwgfHwgKHN1YnNjcmlwdGlvbiA9PT0gdGhpcykgfHwgKHN1YnNjcmlwdGlvbiA9PT0gU3Vic2NyaXB0aW9uLkVNUFRZKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzdWJzY3JpcHRpb25zID0gdGhpcy5fc3Vic2NyaXB0aW9ucztcbiAgICAgICAgaWYgKHN1YnNjcmlwdGlvbnMpIHtcbiAgICAgICAgICAgIHZhciBzdWJzY3JpcHRpb25JbmRleCA9IHN1YnNjcmlwdGlvbnMuaW5kZXhPZihzdWJzY3JpcHRpb24pO1xuICAgICAgICAgICAgaWYgKHN1YnNjcmlwdGlvbkluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIHN1YnNjcmlwdGlvbnMuc3BsaWNlKHN1YnNjcmlwdGlvbkluZGV4LCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgU3Vic2NyaXB0aW9uLkVNUFRZID0gKGZ1bmN0aW9uIChlbXB0eSkge1xuICAgICAgICBlbXB0eS5jbG9zZWQgPSB0cnVlO1xuICAgICAgICByZXR1cm4gZW1wdHk7XG4gICAgfShuZXcgU3Vic2NyaXB0aW9uKCkpKTtcbiAgICByZXR1cm4gU3Vic2NyaXB0aW9uO1xufSgpKTtcbmV4cG9ydHMuU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9U3Vic2NyaXB0aW9uLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIE9ic2VydmFibGVfMSA9IHJlcXVpcmUoJy4uLy4uL09ic2VydmFibGUnKTtcbnZhciB0b1Byb21pc2VfMSA9IHJlcXVpcmUoJy4uLy4uL29wZXJhdG9yL3RvUHJvbWlzZScpO1xuT2JzZXJ2YWJsZV8xLk9ic2VydmFibGUucHJvdG90eXBlLnRvUHJvbWlzZSA9IHRvUHJvbWlzZV8xLnRvUHJvbWlzZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRvUHJvbWlzZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciByb290XzEgPSByZXF1aXJlKCcuLi91dGlsL3Jvb3QnKTtcbi8qIHRzbGludDpkaXNhYmxlOm1heC1saW5lLWxlbmd0aCAqL1xuLyoqXG4gKiBAcGFyYW0gUHJvbWlzZUN0b3JcbiAqIEByZXR1cm4ge1Byb21pc2U8VD59XG4gKiBAbWV0aG9kIHRvUHJvbWlzZVxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZnVuY3Rpb24gdG9Qcm9taXNlKFByb21pc2VDdG9yKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICBpZiAoIVByb21pc2VDdG9yKSB7XG4gICAgICAgIGlmIChyb290XzEucm9vdC5SeCAmJiByb290XzEucm9vdC5SeC5jb25maWcgJiYgcm9vdF8xLnJvb3QuUnguY29uZmlnLlByb21pc2UpIHtcbiAgICAgICAgICAgIFByb21pc2VDdG9yID0gcm9vdF8xLnJvb3QuUnguY29uZmlnLlByb21pc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocm9vdF8xLnJvb3QuUHJvbWlzZSkge1xuICAgICAgICAgICAgUHJvbWlzZUN0b3IgPSByb290XzEucm9vdC5Qcm9taXNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmICghUHJvbWlzZUN0b3IpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdubyBQcm9taXNlIGltcGwgZm91bmQnKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlQ3RvcihmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHZhciB2YWx1ZTtcbiAgICAgICAgX3RoaXMuc3Vic2NyaWJlKGZ1bmN0aW9uICh4KSB7IHJldHVybiB2YWx1ZSA9IHg7IH0sIGZ1bmN0aW9uIChlcnIpIHsgcmV0dXJuIHJlamVjdChlcnIpOyB9LCBmdW5jdGlvbiAoKSB7IHJldHVybiByZXNvbHZlKHZhbHVlKTsgfSk7XG4gICAgfSk7XG59XG5leHBvcnRzLnRvUHJvbWlzZSA9IHRvUHJvbWlzZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRvUHJvbWlzZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciByb290XzEgPSByZXF1aXJlKCcuLi91dGlsL3Jvb3QnKTtcbmZ1bmN0aW9uIGdldFN5bWJvbE9ic2VydmFibGUoY29udGV4dCkge1xuICAgIHZhciAkJG9ic2VydmFibGU7XG4gICAgdmFyIFN5bWJvbCA9IGNvbnRleHQuU3ltYm9sO1xuICAgIGlmICh0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGlmIChTeW1ib2wub2JzZXJ2YWJsZSkge1xuICAgICAgICAgICAgJCRvYnNlcnZhYmxlID0gU3ltYm9sLm9ic2VydmFibGU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAkJG9ic2VydmFibGUgPSBTeW1ib2woJ29ic2VydmFibGUnKTtcbiAgICAgICAgICAgIFN5bWJvbC5vYnNlcnZhYmxlID0gJCRvYnNlcnZhYmxlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICAkJG9ic2VydmFibGUgPSAnQEBvYnNlcnZhYmxlJztcbiAgICB9XG4gICAgcmV0dXJuICQkb2JzZXJ2YWJsZTtcbn1cbmV4cG9ydHMuZ2V0U3ltYm9sT2JzZXJ2YWJsZSA9IGdldFN5bWJvbE9ic2VydmFibGU7XG5leHBvcnRzLiQkb2JzZXJ2YWJsZSA9IGdldFN5bWJvbE9ic2VydmFibGUocm9vdF8xLnJvb3QpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9b2JzZXJ2YWJsZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciByb290XzEgPSByZXF1aXJlKCcuLi91dGlsL3Jvb3QnKTtcbnZhciBTeW1ib2wgPSByb290XzEucm9vdC5TeW1ib2w7XG5leHBvcnRzLiQkcnhTdWJzY3JpYmVyID0gKHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIFN5bWJvbC5mb3IgPT09ICdmdW5jdGlvbicpID9cbiAgICBTeW1ib2wuZm9yKCdyeFN1YnNjcmliZXInKSA6ICdAQHJ4U3Vic2NyaWJlcic7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1yeFN1YnNjcmliZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbi8qKlxuICogQW4gZXJyb3IgdGhyb3duIHdoZW4gb25lIG9yIG1vcmUgZXJyb3JzIGhhdmUgb2NjdXJyZWQgZHVyaW5nIHRoZVxuICogYHVuc3Vic2NyaWJlYCBvZiBhIHtAbGluayBTdWJzY3JpcHRpb259LlxuICovXG52YXIgVW5zdWJzY3JpcHRpb25FcnJvciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFVuc3Vic2NyaXB0aW9uRXJyb3IsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gVW5zdWJzY3JpcHRpb25FcnJvcihlcnJvcnMpIHtcbiAgICAgICAgX3N1cGVyLmNhbGwodGhpcyk7XG4gICAgICAgIHRoaXMuZXJyb3JzID0gZXJyb3JzO1xuICAgICAgICB2YXIgZXJyID0gRXJyb3IuY2FsbCh0aGlzLCBlcnJvcnMgP1xuICAgICAgICAgICAgZXJyb3JzLmxlbmd0aCArIFwiIGVycm9ycyBvY2N1cnJlZCBkdXJpbmcgdW5zdWJzY3JpcHRpb246XFxuICBcIiArIGVycm9ycy5tYXAoZnVuY3Rpb24gKGVyciwgaSkgeyByZXR1cm4gKChpICsgMSkgKyBcIikgXCIgKyBlcnIudG9TdHJpbmcoKSk7IH0pLmpvaW4oJ1xcbiAgJykgOiAnJyk7XG4gICAgICAgIHRoaXMubmFtZSA9IGVyci5uYW1lID0gJ1Vuc3Vic2NyaXB0aW9uRXJyb3InO1xuICAgICAgICB0aGlzLnN0YWNrID0gZXJyLnN0YWNrO1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBlcnIubWVzc2FnZTtcbiAgICB9XG4gICAgcmV0dXJuIFVuc3Vic2NyaXB0aW9uRXJyb3I7XG59KEVycm9yKSk7XG5leHBvcnRzLlVuc3Vic2NyaXB0aW9uRXJyb3IgPSBVbnN1YnNjcmlwdGlvbkVycm9yO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9VW5zdWJzY3JpcHRpb25FcnJvci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbi8vIHR5cGVvZiBhbnkgc28gdGhhdCBpdCB3ZSBkb24ndCBoYXZlIHRvIGNhc3Qgd2hlbiBjb21wYXJpbmcgYSByZXN1bHQgdG8gdGhlIGVycm9yIG9iamVjdFxuZXhwb3J0cy5lcnJvck9iamVjdCA9IHsgZToge30gfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWVycm9yT2JqZWN0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuZXhwb3J0cy5pc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCAoZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHggJiYgdHlwZW9mIHgubGVuZ3RoID09PSAnbnVtYmVyJzsgfSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pc0FycmF5LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuZnVuY3Rpb24gaXNGdW5jdGlvbih4KSB7XG4gICAgcmV0dXJuIHR5cGVvZiB4ID09PSAnZnVuY3Rpb24nO1xufVxuZXhwb3J0cy5pc0Z1bmN0aW9uID0gaXNGdW5jdGlvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlzRnVuY3Rpb24uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5mdW5jdGlvbiBpc09iamVjdCh4KSB7XG4gICAgcmV0dXJuIHggIT0gbnVsbCAmJiB0eXBlb2YgeCA9PT0gJ29iamVjdCc7XG59XG5leHBvcnRzLmlzT2JqZWN0ID0gaXNPYmplY3Q7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pc09iamVjdC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbi8qKlxuICogd2luZG93OiBicm93c2VyIGluIERPTSBtYWluIHRocmVhZFxuICogc2VsZjogYnJvd3NlciBpbiBXZWJXb3JrZXJcbiAqIGdsb2JhbDogTm9kZS5qcy9vdGhlclxuICovXG5leHBvcnRzLnJvb3QgPSAodHlwZW9mIHdpbmRvdyA9PSAnb2JqZWN0JyAmJiB3aW5kb3cud2luZG93ID09PSB3aW5kb3cgJiYgd2luZG93XG4gICAgfHwgdHlwZW9mIHNlbGYgPT0gJ29iamVjdCcgJiYgc2VsZi5zZWxmID09PSBzZWxmICYmIHNlbGZcbiAgICB8fCB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbC5nbG9iYWwgPT09IGdsb2JhbCAmJiBnbG9iYWwpO1xuaWYgKCFleHBvcnRzLnJvb3QpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1J4SlMgY291bGQgbm90IGZpbmQgYW55IGdsb2JhbCBjb250ZXh0ICh3aW5kb3csIHNlbGYsIGdsb2JhbCknKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJvb3QuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgU3Vic2NyaWJlcl8xID0gcmVxdWlyZSgnLi4vU3Vic2NyaWJlcicpO1xudmFyIHJ4U3Vic2NyaWJlcl8xID0gcmVxdWlyZSgnLi4vc3ltYm9sL3J4U3Vic2NyaWJlcicpO1xudmFyIE9ic2VydmVyXzEgPSByZXF1aXJlKCcuLi9PYnNlcnZlcicpO1xuZnVuY3Rpb24gdG9TdWJzY3JpYmVyKG5leHRPck9ic2VydmVyLCBlcnJvciwgY29tcGxldGUpIHtcbiAgICBpZiAobmV4dE9yT2JzZXJ2ZXIpIHtcbiAgICAgICAgaWYgKG5leHRPck9ic2VydmVyIGluc3RhbmNlb2YgU3Vic2NyaWJlcl8xLlN1YnNjcmliZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXh0T3JPYnNlcnZlcjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmV4dE9yT2JzZXJ2ZXJbcnhTdWJzY3JpYmVyXzEuJCRyeFN1YnNjcmliZXJdKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV4dE9yT2JzZXJ2ZXJbcnhTdWJzY3JpYmVyXzEuJCRyeFN1YnNjcmliZXJdKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFuZXh0T3JPYnNlcnZlciAmJiAhZXJyb3IgJiYgIWNvbXBsZXRlKSB7XG4gICAgICAgIHJldHVybiBuZXcgU3Vic2NyaWJlcl8xLlN1YnNjcmliZXIoT2JzZXJ2ZXJfMS5lbXB0eSk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgU3Vic2NyaWJlcl8xLlN1YnNjcmliZXIobmV4dE9yT2JzZXJ2ZXIsIGVycm9yLCBjb21wbGV0ZSk7XG59XG5leHBvcnRzLnRvU3Vic2NyaWJlciA9IHRvU3Vic2NyaWJlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRvU3Vic2NyaWJlci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBlcnJvck9iamVjdF8xID0gcmVxdWlyZSgnLi9lcnJvck9iamVjdCcpO1xudmFyIHRyeUNhdGNoVGFyZ2V0O1xuZnVuY3Rpb24gdHJ5Q2F0Y2hlcigpIHtcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gdHJ5Q2F0Y2hUYXJnZXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgZXJyb3JPYmplY3RfMS5lcnJvck9iamVjdC5lID0gZTtcbiAgICAgICAgcmV0dXJuIGVycm9yT2JqZWN0XzEuZXJyb3JPYmplY3Q7XG4gICAgfVxufVxuZnVuY3Rpb24gdHJ5Q2F0Y2goZm4pIHtcbiAgICB0cnlDYXRjaFRhcmdldCA9IGZuO1xuICAgIHJldHVybiB0cnlDYXRjaGVyO1xufVxuZXhwb3J0cy50cnlDYXRjaCA9IHRyeUNhdGNoO1xuO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dHJ5Q2F0Y2guanMubWFwIl19
