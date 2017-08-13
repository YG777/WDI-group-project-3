const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

function register(req, res) {
  User.create(req.body)
    .then(data => {
      const token = jwt.sign({ id: data.id }, config.secret, { expiresIn: 86400 });
      return res.status(201).json({
        message: `Welcome, ${data.name}`,
        data,
        token
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
      const token = jwt.sign({ id: data.id }, config.secret, { expiresIn: 86400 });
      return res.status(201).json({
        message: `Welcome back, ${data.name}`,
        data,
        token
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
