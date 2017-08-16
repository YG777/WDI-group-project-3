const mongoose = require('mongoose');

const suggestionSchema = new mongoose.Schema({
  image: { type: String },
  name: { type: String, required: true },
  votes: { type: Number, required: true },
  meal: { type: String },
  address: { type: String },
  url: { type: String },
  userVotes: [{ type: mongoose.Schema.ObjectId, ref: 'User' }]
}, {
  timestamps: true
});

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  organization: { type: String },
  admin: { type: mongoose.Schema.ObjectId, ref: 'User' },
  members: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  suggestions: [suggestionSchema]
},{
  timestamps: true
});

groupSchema.set('toJSON', {
  virtuals: true,
  transform(doc, json) {
    delete json._id;
    delete json.__v;
    return json;
  }
});

module.exports = mongoose.model('Group', groupSchema);
