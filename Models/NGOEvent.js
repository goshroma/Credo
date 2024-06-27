const mongoose = require('mongoose');

const ngoEventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true, 
    },
  },
  requiredSkills: [String],
   cause: [String],
});

module.exports = mongoose.model('NGOEvent', ngoEventSchema);
