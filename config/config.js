module.exports = {
  port: process.env.PORT || 4000,
  db: process.env.MONGODB_URI || 'mongodb://localhost/group-proj',
  secret: process.env.SECRET || 'Shh! It\'s a secret!'
};
