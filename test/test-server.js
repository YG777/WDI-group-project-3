const { api, expect } = require('./spec_helper');

describe('GET /group', () => {
  it('should return a 200', function(done) {
    // this.skip()
    api
      .get('/')
      .end((err, res) => {
        if (err) console.log(err);
        expect(res.status).to.eq(200);
        done();
      });
    it('should display all the groups', (done) => {
        api.get('/group')
        .end((err, res) => {
            //test for each - conect to the 
        })
    });
  });
});

