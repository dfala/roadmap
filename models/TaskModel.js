var mongoose = require('mongoose');

var TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  start_date: { type: String },
  end_date: { type: String },
  created_by: { type: String, required: true},
  created_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', TaskSchema);
