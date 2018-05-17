const request = require('request-promise');
const config = require('./config');

exports.rp = function rp(body) {
  const options = {
    uri: `http://localhost:${config.PORT}${config.GRAPHQL_ROUTE}`,
    method: 'POST',
    json: true,
    body
  };

  return request(options);
};
