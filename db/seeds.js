const mongoose = require('mongoose');
const User     = require('../models/user');
const Group    = require('../models/group');
const MessageThread = require('../models/messageThread');
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
    name: 'WDI Breakfast!',
    organization: 'GA WDI 28',
    admin: users[0]._id,
    members: [users[0]._id, users[1]._id],
    location: 'London',
    groupPic: 'http://hyhoi.com/wp-content/uploads/2014/04/trade-commercial-street-spitalfields-coffee-shop-cafe-cake-1.jpg'
  },
  {
    name: 'WDI Lunch!',
    organization: 'GA WDI 28',
    members: [users[0]._id],
    location: 'London',
    groupPic: 'https://thecitylane.com/wp-content/uploads/2015/06/Katsu03.jpg'
  },{
    name: 'WDI PUB!',
    organization: 'GA WDI 28',
    admin: users[0]._id,
    members: [users[0]._id, users[1]._id],
    location: 'London',
    groupPic: 'https://scontent-lhr3-1.xx.fbcdn.net/v/t31.0-8/20280553_1642948312443112_7213921456998578201_o.jpg?oh=1b989760d47cc328585f59d5a06a0cee&oe=5A1FF2B2'

  }]);
})
.then(groups => {
  console.log(`${groups.length} groups created!`);
  return MessageThread.create([
    { group: groups[0]._id },
    { group: groups[1]._id },
    { group: groups[2]._id }
  ])
  .then(messageThreads => {
    console.log(`${messageThreads.length} message threads created!`);
  });
})
.finally(() => {
  mongoose.connection.close();
})
.catch(err => {
  console.log(err);
});
