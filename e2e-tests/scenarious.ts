import { browser, element, by } from 'protractor';


describe('PhoneCat Application', function() {

    it('should redirect \'index.html\' to \'index.html#!/phones\'', () => {
        browser.get('index.html');
        expect(browser.getCurrentUrl()).toMatch(/index\.html#\/mainpage$/);
        expect(true).toBe(true);
    });

    it('should relocate to /tasklist page', () => {
        expect(browser.getCurrentUrl()).toMatch(/index\.html#\/mainpage$/);
        element(by.id('btnManageTasks')).click();
        expect(browser.getCurrentUrl()).toMatch(/index\.html#\/tasklist$/);
    });

    it('should create a new task with max severity value', () => {
        expect(browser.getCurrentUrl()).toMatch(/index\.html#\/tasklist$/);
        var tasksTr = element(by.id('tasksTable')).element(by.tagName('tbody')).all(by.tagName('tr'));
        var tasksCountPromise = tasksTr.count();

        element(by.id('formTaskCreate')).element(by.css('.task-severity')).click();
        var options = element(by.id('formTaskCreate')).element(by.css('.task-severity')).all(by.tagName('option'));
        options.last().click();
        element(by.id('formTaskCreate')).element(by.css('.task-text')).sendKeys('Text of protractor\'s test task');
        element(by.id('btnCreateTask')).click();

        var tasksCountPromise2 = tasksTr.count();

        var tasksCountDifference = Promise.all([tasksCountPromise, tasksCountPromise2]).then((info) => {
            var countBefore = info[0], countAfter = info[1];
            return countAfter - countBefore;
        });

        expect(tasksCountDifference).toBe(1);
    });

    it('should delete just created task', () => {
        expect(browser.getCurrentUrl()).toMatch(/index\.html#\/tasklist$/);
        var tasksTr = element(by.id('tasksTable')).element(by.tagName('tbody')).all(by.tagName('tr'));
        var tasksCountPromise = tasksTr.count();

        // Our raw
        var lastTr = element(by.id('tasksTable')).element(by.tagName('tbody')).all(by.tagName('tr')).last();
        // Check if text of this raw is the text of just created task
        expect(lastTr.element(by.css('.taskText')).getText()).toEqual('Text of protractor\'s test task');

        lastTr.element(by.buttonText('Delete')).click();

        var tasksCountPromise2 = tasksTr.count();

        var tasksCountDifference = Promise.all([tasksCountPromise, tasksCountPromise2]).then((info) => {
            var countBefore = info[0], countAfter = info[1];
            return countAfter - countBefore;
        });

        expect(tasksCountDifference).toBe(-1);
    });

});
