var mongoose = require('mongoose');

var TaskSchema = new mongoose.Schema({
  content       : { type: String, required: true },
  description   : { type: String, required: false },
  links         : [{
                  type: String,
                  href: String
                }],
  start         : { type: Date },
  end           : { type: Date },
  created_by    : { type: String, required: true, default: 'Daniel' },
  created_date  : { type: Date, default: Date.now },
  list_id       : { type: mongoose.Schema.Types.ObjectId, ref: 'List' },
  priority      : { type: Number, default: 0 }
});

module.exports = mongoose.model('Task', TaskSchema);
