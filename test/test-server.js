const { api, expect } = require('./spec_helper');
const Group = require('../models/group');
// const User = require('../models/user');

// const routes = require('../config/routes');
//confirm that routes.route is called using the right values
//is routes.route called with /register
const testData = [{
  name: 'WDI Breakfast!',
  organization: 'GA WDI 28'
  // admin: users[0]._id,
  // members: [users[0]._id, users[1]._id]
}, {
  name: 'WDI Lunch!',
  organization: 'GA WDI 28'
  // members: [users[0]._id]
}, {
  name: 'WDI PUB!',
  organization: 'GA WDI 28'
  // admin: users[0]._id,
  // members: [users[0]._id, users[1]._id]
}];

beforeEach((done) => {
  // User.collection.drop();
  // User.create(testData, done);
  Group.collection.drop();
  Group.create(testData, done);
});


describe('GET /api/groups', () => {
  it('should return a 200', function (done) {
    api
      .get('/api/groups')
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
      
    it('should display all the groups', function (done) {
      api
        .get('/api/groups')
        .end((err, res) => {
          testData.forEach((record) => {
            expect(res.text).to.contain(`<a>${record.name}</a>`);
          });
          done();
        });
    });
  });
});


describe('POST /api/groups', () => {
  it('should return  201 Created', function(done) {
    var name = 'WDI Friday Lunch';
    var organization = 'GA students';
    api.post('/api/groups')
      .type('form')
      .send({ name, organization })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        done();
      });
  });
});


describe('GET /api/groups/:id', () => {
  let record = null;
  beforeEach((done) => {
    Group.findOne({ name: 'WDI PUB!' }, (err, group) => {
      record = group;
      done();
    });
  });
  
  it('should return a 200 Ok', (done) => {
    api
      .get(`/api/groups/${record.id}`)
      .expect(200, done);
      //check the data is correct
  });
  
});