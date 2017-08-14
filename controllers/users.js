const User = require('../models/user');

function usersIndex(req, res) {
  User.find()
    .exec()
    .then(data => {
      if (!data) return res.status(404).json({ message: 'Error: Not found.'});
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json(err);
    });
}

function usersShow(req, res) {
  User.findById(req.params.id)
    .then(data => {
      if (!data) return res.status(404).json({ message: 'Error: Not found.'});
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json(err);
    });
}

function usersUpdate(req, res) {
  User.findByIdAndUpdate(req.params.id, req.body)
    .exec()
    .then(data => {
      if (!data) return res.status(404).json({ message: 'Error: Not found.'});
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json(err);
    });
}

function usersDelete(req, res) {
  User.findByIdAndRemove(req.params.id)
    .exec()
    .then(() => {
      res.sendStatus(204);
    })
    .catch(err => {
      res.status(500).json(err);
    });
}

module.exports = {
  index: usersIndex,
  show: usersShow,
  update: usersUpdate,
  delete: usersDelete
};
