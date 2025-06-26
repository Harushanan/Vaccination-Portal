const mongoose = require('mongoose');

const centerSchema = new mongoose.Schema({
  center: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  venue: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true
  },
  closeTime: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
 nurse: {
  type: String,
  default: "Not Assign"
}

});

const CenterModel = mongoose.model("VaccinationCenter", centerSchema);
module.exports = {CenterModel};