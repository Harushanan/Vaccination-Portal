const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  news: { type: String, required: true },
}, {
  timestamps: true
});

const NewsModel = mongoose.model('News', newsSchema);

module.exports = NewsModel;
