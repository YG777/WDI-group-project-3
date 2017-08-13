const User = require('../models/user');

function register(req, res) {
  User.create(req.body)
    .then(data => {
      return res.status(201).json({
        message: `Welcome, ${data.name}`,
        data
      });
    })
    .catch(err => {
      res.status(500).json(err);
    });
}

function login(req, res) {
  User.findOne({ email: req.body.email })
    .exec()
    .then(data => {
      if (!data || !data.validatePassword(req.body.password)){
        return res.status(401).json({ message: 'Unrecognised credentials.' });
      }
      return res.status(201).json({
        message: `Welcome back, ${data.name}`,
        data
      });
    })
    .catch(err => {
      res.status(500).json(err);
    });
}

module.exports = {
  register,
  login
};
