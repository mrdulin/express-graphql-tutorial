const { expect } = require('chai');

const startServer = require('./server');
const { rp } = require('../util');

let server;

before(done => {
  server = startServer(done);
});

after(done => {
  server.close(done);
});

describe('mutation with input types test suites', () => {
  it('t-0', () => {
    const body = {
      query: `
        mutation createMessageForTest($input: MessageInput) {
          createMessage(input: $input) {
            id
            content
            author
          }
        }
      `,
      variables: {
        input: {
          author: 'mmm',
          content: 'I like her so much'
        }
      }
    };

    return rp(body).then(res => {
      expect(res.data).to.have.property('createMessage');
    });
  });
});
