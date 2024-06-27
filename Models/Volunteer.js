const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
  name: {
    type: String,
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
  preferences: {
    skills: {
      type: [String],
      required: true
    },
    causes: {
         type: [String],
         required: true,
         validate: {
           validator: (v) => v.length >= 2,
           message: 'Please select at least two causes',
         },
    },
  },
});

module.exports = mongoose.model('Volunteer', volunteerSchema);
