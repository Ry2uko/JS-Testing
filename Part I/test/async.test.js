import asyncFoo from '../src/async';

describe('Async', () => {

  it('should return expected value from callback', (done) => {
    asyncFoo((returnedData) => {
      expect(returnedData).to.equal('Xisma');
      done();
    });
  });

  it('should return expected value from promise', (done) => {
    asyncFoo()
      .then((returnedData) => {
        expect(returnedData).to.equal('Xisma');
        done();
      });
  });

});