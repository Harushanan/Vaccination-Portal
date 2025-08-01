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
  center:{ type: String, default: "none" },
  status:{type: String, default: "pending"},
  removereason: { type: String, default: "no reason provided" },
  injectBy: { type: String, default: "no Inject" },
  injectById: { type: String, default: "no Inject" }
}, {
  timestamps: true
});

const otherbookingSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  nic: { type: String, required: true },
  contact: { type: String, required: true },
  address: { type: String, required: true },
  age: { type: String, required: true },
  date: { type: String, required: true },
  vaccine: { type: String, required: true },
  dose: { type: String, required: true },
  healthConditions: { type: String, default: "none" },
  allergies: { type: String, default: "none" },
  center:{ type: String, default: "none" },
  status:{type: String, default: "pending"},
  removereason: { type: String, default: "no reason provided" },
  injectBy: { type: String, default: "no Inject" },
  injectById: { type: String, default: "no Inject" },
  byemail: { type: String, required: true }
}, {
  timestamps: true
});

const BookingModel = mongoose.model('Booking', bookingSchema);
const BookingOthersModel = mongoose.model('BookingOthers', otherbookingSchema);

module.exports = { BookingOthersModel , BookingModel};
