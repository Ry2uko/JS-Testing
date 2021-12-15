import {timeout, describeDate} from '../src/fakeTimer';

describe('Fake Timers', () => {
  let clock;

  beforeEach(() => {
    clock = sinon.useFakeTimers(new Date());
  });

  afterEach(() => {
    clock.restore();
  });

  it('should return expected value from callback', (done) => {
      
    timeout((returnedData) => {
      expect(returnedData).to.equal('Xisma');
      done();
    });
      
    clock.tick(1000)
  });

  it('should correctly describe a date this year', () => {
    const currYear = new Date().getFullYear();
    const description = describeDate(currYear);

    expect(description).to.equal('this year');
  });

  it('should correctly describe a future date', () => {
    const currYear = new Date().getFullYear() + 10;
    const description = describeDate(currYear);

    expect(description).to.equal('future');
  });

  it('should correctly describe a past date', () => {
    const currYear = new Date().getFullYear() - 10;
    const description = describeDate(currYear);

    expect(description).to.equal('past')
  });
});