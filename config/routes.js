const routes = require('express').Router();
const users = require('../controllers/users');
const auth = require('../controllers/authentications');
const groups = require('../controllers/groups');

routes.route('/register')
  .post(auth.register);
routes.route('/login')
  .post(auth.login);

routes.route('/users')
  .get(users.index);
routes.route('/users/:id')
  .get(users.show)
  .put(users.update)
  .patch(users.update)
  .delete(users.delete);

routes.route('/groups')
  .get(groups.index);

module.exports = routes;
