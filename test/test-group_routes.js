const { api, expect } = require('./spec_helper');
const Group = require('../models/group');

const testData = [{
  name: 'WDI Breakfast!',
  organization: 'GA WDI 28'
}, {
  name: 'WDI Lunch!',
  organization: 'GA WDI 28'
}, {
  name: 'WDI PUB!',
  organization: 'GA WDI 28'
}];

beforeEach((done) => {
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
  });
  
});

describe('GET /api/groups/:id/edit', () => {
  
  let record = null;
  beforeEach((done) => {
    Group.findOne({ name: 'WDI Lunch!' }, (err, group) => {
      record = group;
      done();
    });
  });
  
  it('should return a 200 response', (done) => {
    api
      .get(`/api/groups/${record.id}/edit`)
      .expect(200, done);
  });  
});


describe('DELETE /api/groups/:id', () => {
  
  let record = null;
  beforeEach((done) => {
    Group.findOne({ name: 'WDI PUB!' }, (err, group) => {
      record = group;
      done();
    });
  });
  
  it('should return 204', (done) => {
    api
      .delete(`/api/groups/${record.id}`)
      .end((err, res) => {
       
        expect(res.status).to.equal(204);
        done();
      });
  });
  
  it('should delete the group', (done) => {
    api
      .delete(`/api/groups/${record.id}`)

      .end((err, res) => {
        api
          .get('/api/groups');
        expect(res.text).to.not.contain('WDI PUB!');
        done();
      });
  });
});
  


