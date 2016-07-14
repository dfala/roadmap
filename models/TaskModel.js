var mongoose = require('mongoose');

var TaskSchema = new mongoose.Schema({
  content: { type: String, required: true },
  start: { type: Date },
  end: { type: Date },
  created_by: { type: String, required: true, default: 'Jane' },
  created_date: { type: Date, default: Date.now },
  list_id: { type: mongoose.Schema.Types.ObjectId, ref: 'List' }
});

module.exports = mongoose.model('Task', TaskSchema);
