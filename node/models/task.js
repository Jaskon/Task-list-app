var mongoose = require('mongoose');


var task = new mongoose.Schema({
    severity: { type: Number, required: true },
    text: String,
    completed: Boolean
},
    // Where it will placed in BD
    { collection: 'tasks' }
);

module.exports = mongoose.model('Task', task);