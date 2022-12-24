const mongoose = require('mongoose');
// This schema tells us how many times a particular URL has been visited in total
const TotalAccessTimesSchema = mongoose.Schema({
  url: {
    type: String,
    required: [true, 'A valid URL is required'],
    trim: true,
  },
  userId: {
    type: String,
    required: [true, 'A valid userId is required'],
    trim: true,
  },
  count: {
    type: Number,
  },
});

const TotalAccessTimesModel = mongoose.model(
  'TotalAccessTimesModel',
  TotalAccessTimesSchema
);
module.exports = TotalAccessTimesModel;
