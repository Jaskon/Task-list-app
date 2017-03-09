"use strict";
exports.__esModule = true;
var protractor_1 = require("protractor");
describe('PhoneCat Application', function () {
    it('should redirect \'index.html\' to \'index.html#!/phones\'', function () {
        protractor_1.browser.get('index.html');
        expect(protractor_1.browser.getCurrentUrl()).toMatch(/index\.html#\/mainpage$/);
        expect(true).toBe(true);
    });
    it('should relocate to /tasklist page', function () {
        expect(protractor_1.browser.getCurrentUrl()).toMatch(/index\.html#\/mainpage$/);
        protractor_1.element(protractor_1.by.id('btnManageTasks')).click();
        expect(protractor_1.browser.getCurrentUrl()).toMatch(/index\.html#\/tasklist$/);
    });
    it('should create a new task with max severity value', function () {
        expect(protractor_1.browser.getCurrentUrl()).toMatch(/index\.html#\/tasklist$/);
        var tasksTr = protractor_1.element(protractor_1.by.id('tasksTable')).element(protractor_1.by.tagName('tbody')).all(protractor_1.by.tagName('tr'));
        var tasksCountPromise = tasksTr.count();
        protractor_1.element(protractor_1.by.id('formTaskCreate')).element(protractor_1.by.css('.task-severity')).click();
        var options = protractor_1.element(protractor_1.by.id('formTaskCreate')).element(protractor_1.by.css('.task-severity')).all(protractor_1.by.tagName('option'));
        options.last().click();
        protractor_1.element(protractor_1.by.id('formTaskCreate')).element(protractor_1.by.css('.task-text')).sendKeys('Text of protractor\'s test task');
        protractor_1.element(protractor_1.by.id('btnCreateTask')).click();
        var tasksCountPromise2 = tasksTr.count();
        var tasksCountDifference = Promise.all([tasksCountPromise, tasksCountPromise2]).then(function (info) {
            var countBefore = info[0], countAfter = info[1];
            return countAfter - countBefore;
        });
        expect(tasksCountDifference).toBe(1);
    });
    it('should delete just created task', function () {
        expect(protractor_1.browser.getCurrentUrl()).toMatch(/index\.html#\/tasklist$/);
        var tasksTr = protractor_1.element(protractor_1.by.id('tasksTable')).element(protractor_1.by.tagName('tbody')).all(protractor_1.by.tagName('tr'));
        var tasksCountPromise = tasksTr.count();
        // Our raw
        var lastTr = protractor_1.element(protractor_1.by.id('tasksTable')).element(protractor_1.by.tagName('tbody')).all(protractor_1.by.tagName('tr')).last();
        // Check if text of this raw is the text of just created task
        expect(lastTr.element(protractor_1.by.css('.taskText')).getText()).toEqual('Text of protractor\'s test task');
        lastTr.element(protractor_1.by.buttonText('Delete')).click();
        var tasksCountPromise2 = tasksTr.count();
        var tasksCountDifference = Promise.all([tasksCountPromise, tasksCountPromise2]).then(function (info) {
            var countBefore = info[0], countAfter = info[1];
            return countAfter - countBefore;
        });
        expect(tasksCountDifference).toBe(-1);
    });
});
