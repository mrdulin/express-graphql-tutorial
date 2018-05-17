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
  it('should do the mutation correctly with operationName and variables', () => {
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

  it('should do the mutation correctly without operationName and variables', () => {
    const body = {
      query: `
        mutation {
          createMessage(input: {author: "hhh", content: "I love her"}) {
            id
            content
            author
          }
        }
      `
    };

    return rp(body).then(res => {
      expect(res.data).to.have.property('createMessage');
    });
  });

  // mutation中, JSON.stringify() input type类型的数据，graphql会报语法错误
  it('t-3', () => {
    const messageInput = {
      author: 'hhh',
      content: 'I like her so much'
    };

    const body = {
      query: `
        mutation {
          createMessage(input: ${JSON.stringify(messageInput)}) {
            id
            content
            author
          }
        }
      `
    };

    return rp(body).then(res => {
      expect(res.data).to.have.property('createMessage');
    });
  });
});
