const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'User'},
  body: { type: String, required: true }
}, {
  timestamps: true
});

const messageThreadSchema = new mongoose.Schema({
  group: { type: mongoose.Schema.ObjectId, ref: 'Group' },
  messages: [messageSchema]
}, {
  timestamps: true
});

messageThreadSchema.set('toJSON', {
  virtuals: true,
  transform(doc, json) {
    delete json._id;
    delete json.__v;
    return json;
  }
});

module.exports = mongoose.model('MessageThread', messageThreadSchema);
