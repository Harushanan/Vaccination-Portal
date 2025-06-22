const mongoose = require('mongoose');

const vaccineSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Type: { type: String, required: true },
  //Date: { type: String, required: true }, // You can use Date type if formatted
  Slots: { type: Number, required: true },
  Age: { type: String, required: true },
  Doses: { type: Number, required: true },
  Manufacturer: { type: String, required: true },
  Instructions: { type: String, default: '' }
});

const VaccineModel = mongoose.model('Vaccine', vaccineSchema);

module.exports = { VaccineModel };
