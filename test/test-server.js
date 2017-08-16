const { api, expect } = require('./spec_helper');
// const routes = require('../config/routes');

//confirm that routes.route is called using the right values
//is routes.route called with /register

describe('GET /groups', () => {
  it('should return a 200', function(done) {
    // this.skip()
    api
      .get('/groups')
      .end((err, res) => {
        if (err) console.log(err);
        expect(res.status).to.eq(200);
        done();
      });
  });
  it('should return a 200', function(done) {
    // this.skip()
    api
      .get('/')
      .end((err, res) => {
        if (err) console.log(err);
        expect(res.status).to.eq(200);
        done();
      });
  // });
  // it('should display all the groups', function(done) {
  //   api
  //     .get('/groups')
  //     .end((err, res) => {
  //       if(err) console.log(err);
  //       expect(res.status).to.eq(200); 
  //     });
  // });
});