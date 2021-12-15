import describeData from '../src/warmUp';

describe('Warm-Up', () => {
  
  it('should return undefined if no parameter is passed', () => {
    let clock = sinon.useFakeTimers();
    expect(describeData()).to.be.undefined;
    clock.tick(60);
    clock.restore();
  });

  it('should correctly describe a data type', () => {
    const data = "I'm a string!";
    expect(describeData(data)).to.equal(typeof data);
  });

});
