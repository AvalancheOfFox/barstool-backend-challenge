const mongoose = require('mongoose')

const cachedDataSchema = new mongoose.Schema({
    data: {
      type: Object,
      required: true,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
    url: {
      type: String,
      required: true,
    },
  });

  const CachedData = mongoose.model('CachedData', cachedDataSchema);
  
  module.exports = CachedData;