var fs          = require('fs');
var express     = require('express');
var ObjectId    = require('mongoose').Types.ObjectId;
var app         = new (express.Router)();
var models      = require('../models');


app.get('/', function(req, res, next) {
    res.redirect('/index.html');
});

app.use(express.static(__dirname + '/../../app'));

app.get(/favicon\.ico$/, function(req, res, next) {
    res.end();
});


// BackEnd logic
app.get('/getTasks', function(req, res, next) {
    models.Task.find({}).exec().then(function(data) {
        res.end(JSON.stringify(data));
    });
});

// Update all tasks. Not recommended
app.post('/updateTasks', function(req, res, next) {
    models.Task.remove({}, function(err) {
        if (err) console.log('Error drop collection: ', err);
        else {
            var taskModel;
            for (var i = 0; i < req.body.length; i++) {
                taskModel = new models.Task({
                    severity: req.body[i].severity,
                    text: req.body[i].text,
                    completed: req.body[i].completed
                });

                taskModel.save(function(err, insertedData) {
                    if (err) console.log('Error inserting data: ', err);
                    else console.log(insertedData.text);
                });
            }

            res.end('2');
        }
    });
});


app.post('/updateTask', function(req, res, next) {

    console.log('\'/updateTask\' request from ', req.connection.remoteAddress ,'. Data: ', req.body);
    var task = req.body;
    models.Task.findOne({_id: task._id}).exec().then(function(data) {
        // Remove this task ...
        /*models.Task.remove({_id: task._id}, function(err, deletedInfo) {
            if (err) console.log('Error while removing task: ', err);
            else {
                console.log('Task deleted: ', deletedInfo.result);

                // ... and push it again! :D (Why not?)
                var taskModel = new models.Task({
                    severity: task.severity,
                    text: task.text,
                    completed: task.completed
                });

                taskModel.save(function(err, insertedData) {
                    if (err) console.log('Error inserting data: ', err);
                    else {
                        console.log('Task inserted: ', insertedData.text);*/

        var oldTask = {severity: data.severity, text: data.text, completed: data.completed};
        data.severity = task.severity;
        data.text = task.text;
        data.completed = task.completed;

        data.save(function(err, updatedTask) {
            if (err) console.log(err.message);
            else {
                // Severities changing (if there is no same-severity tasks)
                models.Task.find({}).exec().then(function(tasks) {
                    var elemWithSameSeverityExists = false;
                    for (var i = 0; i < tasks.length; i++)
                        if (tasks[i].severity == oldTask.severity) {
                            elemWithSameSeverityExists = true;
                            break;
                        }
                    if (!elemWithSameSeverityExists) {
                        console.log('Changing severities...');
                        tasks.forEach(function(elem) {
                            if (elem.severity > oldTask.severity) {
                                elem.severity--;
                                models.Task.findById(elem._id, function(err, task) {
                                    if (err) console.log(err.message);
                                    else {
                                        task.severity = elem.severity;
                                        task.save(function(err, updatedTask) {
                                            if (err) console.log(err.message);
                                            else console.log(updatedTask);
                                        });
                                    }
                                });
                            }
                        });
                    }
                });

                res.end('2');       // Nothing special
            }
        });

                        
                    /*}
                });
            }
        });*/
    });
});

app.post('/insertTask', function(req, res, next) {

    console.log('\'/insertTask\' request from ', req.connection.remoteAddress ,'. Data: ', req.body);
    var betweenSeverities = req.body.betweenSeverities;

    // Push created task
    var taskModel = new models.Task({
        severity: req.body.task.severity,
        text: req.body.task.text,
        completed: req.body.task.completed
    });

    // Changing severities (if betweenSeverities is true)
    if (betweenSeverities) {
        models.Task.find({}).exec().then(function(tasks) {
            tasks.forEach(function(elem) {
                if (elem.severity >= req.body.task.severity) {
                    elem.severity++;
                    models.Task.findById(elem._id, function(err, task) {
                        if (err) console.log(err.message);
                        else {
                            task.severity = elem.severity;
                            task.save(function(err, updatedTask) {
                                if (err) console.log(err.message);
                                else console.log(updatedTask);
                            });
                        }
                    });
                }
            });

            taskModel.save(function(err, insertedData) {
                if (err) console.log('Error inserting data: ', err);
                else {
                    console.log('Task inserted: ', insertedData.text);
                    res.end('2');       // Nothing special
                }
            });
        });
    } else {
        taskModel.save(function(err, insertedData) {
            if (err) console.log('Error inserting data: ', err);
            else {
                console.log('Task inserted: ', insertedData.text);
                res.end('2');       // Nothing special
            }
        });
    }
});

app.post('/deleteTask', function(req, res, next) {

    console.log('\'/deleteTask\' request from ', req.connection.remoteAddress ,'. Data: ', req.body);
    var task = req.body.task;

    // Remove task
    models.Task.findOneAndRemove({_id: task._id}, function(err, deletedInfo) {
        if (err) console.log('Error while removing task: ', err);
        else {
            console.log('Task deleted: ', deletedInfo);

            // Severities changing (if there is no same-severity tasks)
            models.Task.find({}).exec().then(function(tasks) {
                var elemWithSameSeverityExists = false;
                for (var i = 0; i < tasks.length; i++)
                    if (tasks[i].severity == task.severity) {
                        elemWithSameSeverityExists = true;
                        break;
                    }
                if (!elemWithSameSeverityExists) {
                    console.log('Changing severities...');
                    tasks.forEach(function(elem) {
                        if (elem.severity > task.severity) {
                            elem.severity--;
                            models.Task.findById(elem._id, function(err, task) {
                                if (err) console.log(err.message);
                                else {
                                    task.severity = elem.severity;
                                    task.save(function(err, updatedTask) {
                                        if (err) console.log(err.message);
                                        else console.log(updatedTask);
                                    });
                                }
                            });
                        }
                    });
                }
            });

            res.end('2');       // Nothing special
        }
    });
});


module.exports = app;