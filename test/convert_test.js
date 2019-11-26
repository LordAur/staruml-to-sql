const chai = require('chai');
const staruml = require('../lib/converter');

chai.should();

describe('Unit Testing', () => {
  it('Test convert() function and test file/test.mdj', (done) => {
    staruml
      .convert(`${__dirname}/file/test.mdj`, `${__dirname}/file`)
      .then((savepath) => {
        savepath.should.be.a('string');
        done();
      })
      .catch((err) => {
        throw err;
      });
  });
});
