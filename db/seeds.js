const mongoose = require('mongoose');
const User     = require('../models/user');
const Group    = require('../models/group');
const config   = require('../config/config');
mongoose.Promise = require('bluebird');
mongoose.connect(config.db);

User.collection.drop();
Group.collection.drop();

User.create([{
  name: 'Administrator',
  email: 'admin@ga.co',
  password: 'password',
  passwordConfirmation: 'password'
},{
  name: 'Benjamin Chang',
  email: 'ben@ga.co',
  password: 'password',
  passwordConfirmation: 'password'
}])
.then(users => {
  console.log(`${users.length} users created!`);

  return Group.create([{
    name: 'Test group',
    organization: 'GA WDI 28 Lunch!',
    members: [users[0]._id, users[1]._id]
  },{
    name: 'Delete group',
    organization: 'GA WDI 28 Lunch',
    members: [users[0]._id, users[1]._id]
  },{
    name: 'Delete group2',
    organization: 'GA WDI 28 Lunch',
    members: [users[0]._id, users[1]._id]
  }]);
})
.then(groups => {
  console.log(`${groups.length} groups created!`);
})
.finally(() => {
  mongoose.connection.close();
})
.catch(err => {
  console.log(err);
});
