const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: String, required: true },
  address: { type: String, required: true },
  age: { type: String, required: true },
  date: { type: String, required: true },
  vaccine: { type: String, required: true },
  dose: { type: String, required: true },
  healthConditions: { type: String, default: "none" },
  allergies: { type: String, default: "none" },
}, {
  timestamps: true
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
