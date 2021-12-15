import stargaze from '../src/stargaze';
import request from 'request';

const repo = {
  owner: 'Ry2uko',
  name: 'REST-API-With-Express-Nodejs-And-MongoDB'
};  

describe('Spies', () => {
  let spyRequestGet;

  beforeEach(() => {
    spyRequestGet = sinon.spy(request, 'get');
  });

  afterEach(() => {
    spyRequestGet.restore();
  });

  it('should make a get request once', (done) => {
    stargaze(repo.owner, repo.name, () => {
      expect(spyRequestGet.callCount)
        .to.equal(1);
      done();
    });
  });

  it('should make request with requested URL', (done) => {
    stargaze(repo.owner, repo.name, () => {
      expect(spyRequestGet.getCall(0).args[0].uri)
        .to.equal(`https://api.github.com/repos/${repo.owner}/${repo.name}`);
        done();
      });
  });

});

describe('Stubs', () => {
  let stubRequestGet; 

  beforeEach(() => {
    stubRequestGet = sinon.stub(request, 'get');
  });

  afterEach(() => {
    stubRequestGet.restore();
  });

  it('should make a get request once', (done) => {
    stubRequestGet.yields(
      null,
      {statusCode: 100},
      {stargazers_count: 3000}
    );

    stargaze(repo.owner, repo.name, () => {
      expect(stubRequestGet.callCount)
        .to.equal(1);
        done();
      });
    });

  it('should return expected data', (done) => {
    const givenApiResponse =  {
      'stargazers_count': 100
    };

    stubRequestGet.yields(
      null, 
      {statusCode: 200},
      givenApiResponse
    );

    stargaze(repo.owner, repo.name, (data) => {
      expect(data).deep.equal({
        stars: givenApiResponse.stargazers_count
      });
      done();
    });
  });

  it('should return expected data when rate limited', (done) => {
    const givenApiResponse = {
      message: 'API rate limited exceeded',
      documentation_url: 'https://developer.github.com/v3/#rate-limiting'
    }
      
    stubRequestGet.yields(
      new Error('API rate limit exceeded'),
      {statusCode: 403},
      givenApiResponse
    );

    stargaze(repo.owner, repo.name, (data) => {
      expect(data).to.deep.equal({
        success: false,
        statusCode: 403,
        error: 'API is rate limited - try again later'
      });
      done();
    });
  });

});