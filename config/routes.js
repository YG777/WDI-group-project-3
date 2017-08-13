const routes = require('express').Router();
const users = require('../controllers/users');
const auth = require('../controllers/authentications');

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

module.exports = routes;
