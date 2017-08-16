const MessageThread = require('../models/messageThread');

function messageThreadIndex(req, res) {
  MessageThread.find()
    .exec()
    .then(data => {
      if (!data) return res.status(404).json({ message: 'Error: Not Valid.' });
      res.status(201).json(data);
    })
    .catch(err => res.status(500).json(err));
}

function messageThreadShow(req, res) {
  MessageThread.findOne({group: req.params.id})
    .exec()
    .then(data => {
      if (!data) return res.status(404).json({ message: 'Error: Not Valid.' });
      res.status(201).json(data);
    })
    .catch(err => res.status(500).json(err));
}

function messageThreadUpdate(req, res) {
  MessageThread.findById(req.params.id)
    .exec()
    .then(message => {
      if (!message) return res.status(404).json({ message: 'Error: Not Valid.' });
      message.messages.push(req.body);
      message.save();
      res.status(200).json(message);
    })
    .catch(err => res.status(500).json(err));

}

module.exports = {
  index: messageThreadIndex,
  show: messageThreadShow,
  update: messageThreadUpdate
};
