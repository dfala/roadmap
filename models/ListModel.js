var mongoose = require('mongoose');

var ListSchema = new mongoose.Schema({
  title         : { type: String, required: true },
  created_by    : { type: String, required: true, default: 'Jane' },
  created_date  : { type: Date, default: Date.now },
  tasks         : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
  list_id       : { type: mongoose.Schema.Types.ObjectId, ref: 'List' },
  project       : { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
});

module.exports = mongoose.model('List', ListSchema);
