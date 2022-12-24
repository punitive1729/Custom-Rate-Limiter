const mongoose = require('mongoose');
const LastMinuteAccessTimesSchema = mongoose.Schema({
  userId: {
    type: String,
    required: [true, 'A valid userId is required'],
    trim: true,
  },
  url: {
    type: String,
    required: [true, 'A valid URL is required'],
    trim: true,
  },
  createdAt: {
    type: Date,
    expires: 60,
    default: Date.now(),
  },
});

const LastMinuteAccessTimesModel = mongoose.model(
  'LastMinuteAccessTimesModel',
  LastMinuteAccessTimesSchema
);

module.exports = LastMinuteAccessTimesModel;
