describe('PhoneCat Application', function() {

    it('should redirect \'index.html\' to \'index.html#!/phones\'', function() {
        browser.get('index.html');
        expect(browser.getLocationAbsUrl()).toBe('/mainpage');
    });

    it('should relocate to /tasklist page', function() {
    	expect(browser.getLocationAbsUrl()).toBe('/mainpage');
    	element(by.id('btnManageTasks')).click();
    	expect(browser.getLocationAbsUrl()).toBe('/tasklist');
    });

    it('should create a new task with max severity value', function() {
    	expect(browser.getLocationAbsUrl()).toBe('/tasklist');
    	var tasksTr = element(by.id('tasksTable')).element(by.tagName('tbody')).all(by.tagName('tr'));
    	var tasksCountPromise = tasksTr.count();

    	element(by.model('taskToCreate.severity')).click();
    	var options = element(by.model('taskToCreate.severity')).all(by.tagName('option'));
    	options.last().click();
    	element(by.model('taskToCreate.text')).sendKeys('Text of protractor\'s test task');
    	element(by.id('btnCreateTask')).click();

    	var tasksCountPromise2 = tasksTr.count();

    	var tasksCountDifference = Promise.all([tasksCountPromise, tasksCountPromise2]).then(function(info) {
			var countBefore = info[0], countAfter = info[1];
			return countAfter - countBefore;
		});

    	expect(tasksCountDifference).toBe(1);
    });

    it('should delete just created task', function() {
    	expect(browser.getLocationAbsUrl()).toBe('/tasklist');
    	var tasksTr = element(by.id('tasksTable')).element(by.tagName('tbody')).all(by.tagName('tr'));
    	var tasksCountPromise = tasksTr.count();

    	// Our raw
    	var lastTr = element(by.id('tasksTable')).element(by.tagName('tbody')).all(by.tagName('tr')).last();
    	// Check if text of this raw is the text of just created task
    	expect(lastTr.element(by.css('.taskText')).getText()).toEqual('Text of protractor\'s test task');

    	lastTr.element(by.buttonText('Delete')).click();

    	var tasksCountPromise2 = tasksTr.count();

    	var tasksCountDifference = Promise.all([tasksCountPromise, tasksCountPromise2]).then(function(info) {
			var countBefore = info[0], countAfter = info[1];
			return countAfter - countBefore;
		});

    	expect(tasksCountDifference).toBe(-1);
    });

});