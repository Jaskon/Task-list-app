'use strict'

describe('taskListComponent', function() {
    var $ctrl, $scope, $httpBackend;

    beforeEach(module('taskList'));

    describe('controller', function() {
        beforeEach(inject(function(tasksModel, $componentController, $rootScope, _$httpBackend_) {
            $scope = $rootScope.$new();
            $ctrl = $componentController('taskListComponent', {$scope: $scope});

            $httpBackend = _$httpBackend_;
            // Initial request
            var getReqHandler = $httpBackend.whenGET('/getTasks').respond([]);
            $httpBackend.expectGET('/getTasks');
            $httpBackend.flush();

            $httpBackend.whenPOST('/insertTask', 
                {task: {severity: 1, text: 'Task text 1', completed: false, editing: false}, betweenSeverities: false})
                .respond(200);
            $httpBackend.whenPOST('/insertTask', 
                {task: {severity: 1, text: 'Task text 1', completed: false, editing: false}, betweenSeverities: true})
                .respond(200);
            $httpBackend.whenPOST('/deleteTask', 
                {task: {severity: 1, text: 'Task text 1', completed: false, editing: false}})
                .respond(200);
            getReqHandler.respond([
                {severity: 1, text: 'Task text 1', completed: false, editing: false}]);
        }));

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });


        it('should have an empty tasks array', function() {
            expect($scope.tasks).toEqual([]);
        });

        // Tasks editing functions
        it('should start task\'s editing mode and modify tempTask variable', function() {
            var task = {severity: 1, text: 'Task text 1', completed: false, editing: false};
            $scope.editTask(task);

            expect(task).toEqual({severity: 1, text: 'Task text 1', completed: false, editing: true});
            expect($scope.tempTask).toEqual({severity: '1', text: 'Task text 1'});
        });

        it('should not be able to start task\'s editing mode and alert a message about it', function() {
            $scope.tasks = [{severity: 1, text: 'Task text 1', completed: true, editing: true}];
            var task = {severity: 1, text: 'Task text 1', completed: false, editing: false};
            $scope.editTask(task);

            expect(task).toEqual({severity: 1, text: 'Task text 1', completed: false, editing: false});
            expect($scope.tempTask).toEqual({});
        });

        it('should cancel task\'s editing mode', function() {
            var task = {severity: 1, text: 'Task text 1', completed: false, editing: true};
            $scope.cancelEditTask(task);

            expect(task).toEqual({severity: 1, text: 'Task text 1', completed: false, editing: false});
        });

        it('should post an /insertTask request with tempTask data', function() {
            $httpBackend.expectPOST('/insertTask',
                {task: {severity: 1, text: 'Task text 1', completed: false, editing: false}, betweenSeverities: false});

            $scope.taskToCreate = {
                severity: 1,
                text: 'Task text 1',
                completed: false
            };
            $scope.createTask();

            $httpBackend.flush();

            // Callback (do not calling by karma)
        });

        it('should post an /insertTask request with tempTask data (betweenSeverities is true)', function() {
            $httpBackend.expectPOST('/insertTask',
                {task: {severity: 1, text: 'Task text 1', completed: false, editing: false}, betweenSeverities: true});

            $scope.taskToCreate = {
                severity: 1,
                text: 'Task text 1',
                completed: false
            };
            $scope.betweenSeverities = true;
            $scope.createTask();

            $httpBackend.flush();

            // Callback (do not calling by karma)
        });

        it('should post a /deleteTask request with tempTask data', function() {
            $httpBackend.expectPOST('/deleteTask', 
                {task: {severity: 1, text: 'Task text 1', completed: false, editing: false}});

            var task = {
                severity: 1,
                text: 'Task text 1',
                completed: false,
                editing: false
            };
            $scope.deleteTask(task);

            $httpBackend.flush();
        });
    });
});