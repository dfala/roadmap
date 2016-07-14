var mongoose = require('mongoose');

var TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  start_date: { type: String },
  end_date: { type: String },
  created_by: { type: String, required: true, default: 'Jane' },
  created_date: { type: Date, default: Date.now },
  list_id: { type: mongoose.Schema.Types.ObjectId, ref: 'List' }
});

module.exports = mongoose.model('Task', TaskSchema);
