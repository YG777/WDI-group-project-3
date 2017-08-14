const routes = require('express').Router();
const users = require('../controllers/users');
const auth = require('../controllers/authentications');
const groups = require('../controllers/groups');
const suggestions = require('../controllers/suggestions');

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
  .get(groups.index)
  .post(groups.create);
routes.route('/groups/:id')
  .get(groups.show)
  .post(suggestions.create)
  .put(groups.update)
  .patch(groups.update)
  .delete(groups.delete);

module.exports = routes;
