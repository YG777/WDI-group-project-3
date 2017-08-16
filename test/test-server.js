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

//display all names of the groups
//join button if not joined yet

describe('GET /groups', () => {
  it('should return a 200', function (done) {
    api
      .get('/groups')
      .end((err, res) => {
        if (err) console.log(err);
        expect(res.status).to.eq(200);
        done();
      });
      
    it('should display all the groups', function (done) {
      api
        .get('/groups')
        .end((err, res) => {
          testData.forEach((record) => {
            expect(res.text).to.contain(`<a>${record.name}</a>`);
          });
          done();
        });
    });
  });
});


describe('GET /groups/new', () => {
  it('should return a 200 response', (done) => {
    api
      .get('/groups/new')
      .expect(200, done);
  });

  // it('should display a form'), (done) => {
  //   api.get('groups/new')
  //     .end((err, res) => {
  //       expect(res.text).to.contain('<form ng-submit="groups.new()">');
  //       expect(res.text).to.contain('ng-model="groups.group.name"');
  //       expect(res.text).to.contain('ng-model="groups.group.organization"');
  //     done();
  //   });
  // });
});

describe('POST /groups', () => {
  it('should redirect to /groups', (done) => {
    api.post('/groups')
      .type('form')
      .send({
        name: 'WDI Friday Lunch',
        organization: 'GA students'
      })
      .end((err, res) => {
        expect(res.status).to.equal(302);
        expect(res.headers.location).to.equal('/groups');
        done();
      });
  });

// it('should create a new group', (done) => {
//   api.post('/groups')
//     .type('form')
//     .send({
//       name: 'WDI Friday Lunch',
//       organization: 'GA students'
//     })
//     .end(() => {
//       api.get('/groups')
//         .end((err, res) => {
//           expect(res.text).to.contain('ng-repeat="group in groups.all"');
//           expect(res.text).to.contain('ui-sref="groupsShow({ id: group.id })"');
//           done();
//         });
//     });
// });
});


describe('GET /groups/:id', () => {
  let record = null;
  beforeEach((done) => {
    Group.findOne({ name: 'WDI PUB!' }, (err, group) => {
      record = group;
      done();
    });
  });
  
  it('should return a 200 response', (done) => {
    api
      .get(`/groups/${record.id}`)
      .expect(200, done);
  });
  
  // it('should display the group', (done) => {
  //   api
  //     .get(`/groups/${record.id}`)
  //     .end((err, res) => {
  //       expect(res.text).to.contain('');
  //       expect(res.text).to.contain('');
  //       done();
  //     });
  // });
  
  // it('should display an edit link', (done) => {
  //   api
  // .get(`/groups/${record.id}`)
  //     .end((err, res) => {
  //       expect(res.text).to.contain(`href="/groups/${record.id}/edit"`);
  //       done();
  //     });
  // });
  
  // it('should display a delete form', (done) => {
  //   api
  //     .get(`/groups/${record.id}`)
  //     .end((err, res) => {
  //       expect(res.text).to.contain(``);
  //       expect(res.text).to.contain(``);
  //       done();
  //     });
  // });
  
});