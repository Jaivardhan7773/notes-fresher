const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },
  title: { type: String, required: true, minlength: 3, maxlength: 120 },
  content: { type: String, default: '', maxlength: 2000 }
}, { timestamps: true });

module.exports = mongoose.model('Note', noteSchema);