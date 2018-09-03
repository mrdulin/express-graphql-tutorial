import { expect } from 'chai';
import http from 'http';
import { Done } from 'mocha';
import { ExecutionResult } from 'graphql';

import { start } from './server';
import { rp } from '../util';

let server: http.Server;
before(async () => {
  server = await start();
});

after((done: Done) => {
  server.close(done);
});

describe('mutation with input types test suites', () => {
  it('should do the mutation correctly with operationName and variables', () => {
    const body = {
      query: `
        mutation createMessageForTest($message: MessageInput!) {
          createMessage(message: $message) {
            id
            content
            author
          }
        }
      `,
      variables: {
        message: {
          author: 'mmm',
          content: 'I like her so much'
        }
      }
    };

    return rp(body).then(res => {
      expect(res.data).to.have.property('createMessage');
    });
  });

  it('should do the mutation correctly with operationName and variables, and operationName same with mutation name', () => {
    const body = {
      query: `
        mutation createMessage($message: MessageInput!) {
          createMessage(message: $message) {
            id
            content
            author
          }
        }
      `,
      variables: {
        message: {
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
          createMessage(message: {author: "hhh", content: "I love her"}) {
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

  it('should not pass when pass wrong parameters to body - 1', () => {
    const author = 'hhh';
    const content = 'I love her';

    const body = {
      query: `
        mutation {
          createMessage(message: {author: ${author}, content: ${content}}) {
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

  it('should not pass when pass wrong parameters to body - 2', () => {
    const author = "'hhh'";
    const content = "'I want to marry her'";

    const body = {
      query: `
        mutation {
          createMessage(message: {author: ${author}, content: ${content}}) {
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

  it('should not pass when pass wrong parameters to body - 3', () => {
    const messageInput = {
      author: 'hhh',
      content: 'I like her so much'
    };

    const body = {
      query: `
        mutation {
          createMessage(message: ${JSON.stringify(messageInput)}) {
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

  it('should pass when pass correct parameters to body', () => {
    const author = '"hhh"';
    const content = '"I love her"';

    const body = {
      query: `
        mutation {
          createMessage(message: {author: ${author}, content: ${content}}) {
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
