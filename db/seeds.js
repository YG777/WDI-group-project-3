const mongoose = require('mongoose');
const User     = require('../models/user');
const config   = require('../config/config');
mongoose.Promise = require('bluebird');
mongoose.connect(config.db);

User.collection.drop();

User.create([{
  name: 'Administrator',
  email: 'admin@ga.co',
  password: 'password',
  passwordConfirmation: 'password'
}])
.then(users => {
  console.log(`${users.length} users created!`);
})
.finally(() => {
  mongoose.connection.close();
})
.catch(err => {
  console.log(err);
});
