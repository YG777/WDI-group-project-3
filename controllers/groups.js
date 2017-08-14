const Group = require('../models/group');

function groupsIndex(req, res) {
  Group.find()
    .exec()
    .then(data => {
      if (!data) return res.status(404).json({ message: 'Error: Not Found.' });
      res.status(200).json(data);
    })
    .catch(err => res.status(500).json(err));
}

module.exports = {
  index: groupsIndex
};
