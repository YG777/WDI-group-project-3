const Group = require('../models/group');

function suggestionsCreate(req, res) {
  req.body.votes = 1;
  Group
    .findById(req.params.id)
    .exec()
    .then(data => {
      data.suggestions.push(req.body);
      data.save();
      res.status(200).json(data);
    })
    .catch(err => res.status(500).json(err));
}

module.exports = {
  create: suggestionsCreate
};
