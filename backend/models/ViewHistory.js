const mongoose = require('mongoose');

const ViewHistorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref : 'User',
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref : 'Product',
    required: true,
  },
});

const ViewHistory = mongoose.model('Viewhistory', ViewHistorySchema);

module.exports = ViewHistory;
