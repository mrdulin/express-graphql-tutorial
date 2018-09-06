import { expect } from 'chai';
import http from 'http';
import { Done } from 'mocha';

import { main, schema } from './server';
import { resolvers } from './resolvers';
import { db } from './db';
import { graphql, ExecutionResult } from 'graphql';

let server: http.Server;
before('Start server', async () => {
  server = await main();
});

after('Stop server', (done: Done) => {
  server.close(done);
});

describe('mutation test suites', () => {
  it('should return value correcly when pass a query to graphql execution function', async () => {
    const query: string = `
      query {
        getMessage
      }
    `;

    const actualValue: ExecutionResult<{ getMessage: string }> = await graphql<{ getMessage: string }>({
      schema,
      source: query,
      contextValue: { db },
      rootValue: resolvers
    });

    const expectValue: ExecutionResult<{ getMessage: string }> = {
      data: {
        getMessage: db.message
      }
    };

    expect(actualValue).to.be.deep.equal(expectValue);
  });

  it('should modify the message correctly when pass a mutation to graphql execution function', async () => {
    const message: string = 'graphql sucks';
    const mutation: string = `
      mutation setMessage($message: String) {
        setMessage(message: $message)
      }
    `;

    const actualValue: ExecutionResult<{ setMessage: string }> = await graphql<{ setMessage: string }>({
      schema,
      source: mutation,
      contextValue: { db },
      rootValue: resolvers,
      variableValues: { message }
    });

    const expectValue: ExecutionResult<{ setMessage: string }> = {
      data: {
        setMessage: message
      }
    };

    expect(actualValue).to.be.deep.equal(expectValue);
  });
});
