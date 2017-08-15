const Group = require('../models/group');
const MessageThread = require('../models/messageThread');

function groupsIndex(req, res) {
  Group.find()
    .populate('members')
    .exec()
    .then(data => {
      if (!data) return res.status(404).json({ message: 'Error: Not Found.' });
      res.status(200).json(data);
    })
    .catch(err => res.status(500).json(err));
}

function groupsShow(req, res) {
  Group.findById(req.params.id)
    .populate('members')
    .exec()
    .then(data => {
      if (!data) return res.status(404).json({ message: 'Error: Not Found.' });
      res.status(200).json(data);
    })
    .catch(err => res.status(500).json(err));
}

function groupsCreate(req, res) {
  Group.create(req.body)
    .then(data => {
      if (!data) return res.status(404).json({ message: 'Error: Not Valid.' });
      res.status(201).json(data);
      const messageThreadCreationObject = {group: data.id};
      return MessageThread.create(messageThreadCreationObject)
        .then(data => {
          if (!data) return res.status(404).json({ message: 'Error: Not Valid.' });
          res.status(201).json(data);
        });
    })
    .catch(err => res.status(500).json(err));
}

function groupsUpdate(req, res) {
  Group.findByIdAndUpdate(req.params.id, req.body)
    .exec()
    .then(data => {
      if (!data) return res.status(404).json({ message: 'Error: Not Valid.' });
      res.status(200).json(data);
    })
    .catch(err => res.status(500).json(err));
}

function groupsDelete(req, res) {
  Group.findByIdAndRemove(req.params.id)
    .exec()
    .then(() => {
      res.sendStatus(204);
    })
    .catch(err => res.status(500).json(err));
}

module.exports = {
  index: groupsIndex,
  show: groupsShow,
  create: groupsCreate,
  update: groupsUpdate,
  delete: groupsDelete
};
