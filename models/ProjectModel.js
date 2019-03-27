var mongoose = require('mongoose');

var ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true, default: '( untitled )' },
  created_by: { type: String, required: true, default: 'Jane' },
  created_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Project', ProjectSchema);
