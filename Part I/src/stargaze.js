import request from 'request';

function stargaze(owner, repository, callback) {
  const githubURL = `https://api.github.com/repos/${owner}/${repository}`;
  const requestOptions = {
    uri: githubURL,
    headers: {
      'User-Agent': 'JS-Testing'
    },
    resolveWithFullResponse: true,
    json: true
  };

  request.get(requestOptions, (error, response, body) => {
    if(response.statusCode === 403) {
      callback({
        success: false,
        statusCode: response.statusCode,
        error: 'API is rate limited - try again later'
      });
    } else {
      callback({
        stars: body.stargazers_count
      });
    }

  });
}

export default stargaze;