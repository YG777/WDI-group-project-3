const express    = require('express');
const mongoose   = require('mongoose');
const cors       = require('cors');
const bodyParser = require('body-parser');
const morgan     = require('morgan');
const expressJWT = require('express-jwt');
const config     = require('./config/config');
const routes     = require('./config/routes');
mongoose.Promise = require('bluebird');
const dest       = `${__dirname}/public`;
const app        = express();

mongoose.connect(config.db);
if (app.get('env') !== 'production') app.use(cors());
app.use(express.static(dest));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// comment out this to test api group routes 
// app.use('/api', expressJWT({ secret: config.secret})
//   .unless({
//     path: [
//       {url: '/api/login', methods: ['POST']},
//       {url: '/api/register', methods: ['POST']}
//     ]
//   }));

// app.use(jwtErrorHandler);

// function jwtErrorHandler(err, req, res, next) {
//   if (err.name !== 'UnauthorizedError') return next();
//   return res.status(401).json({ message: 'Unauthorized request'});
// }

app.use('/api', routes);
app.get('/*', (req, res) => res.sendFile(`${dest}/index.html`));

app.listen(config.port, () => console.log(`Express has started on port: ${config.port}`));

module.exports = app;