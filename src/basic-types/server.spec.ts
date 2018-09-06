import { expect } from 'chai';
import http from 'http';
import { Done } from 'mocha';

import { main, schema, resolvers } from './server';
import { graphql, ExecutionResult } from 'graphql';

let server: http.Server;
before('Start server', async () => {
  server = await main();
});

after('Stop server', (done: Done) => {
  server.close(done);
});

describe('basic-types test suites', () => {
  it('quoteOfTheDay', async () => {
    const query: string = `
      query {
        quoteOfTheDay
      }
    `;
    const actualValue: ExecutionResult<{ quoteOfTheDay: string }> = await graphql<{ quoteOfTheDay: string }>({
      schema,
      source: query,
      rootValue: resolvers
    });

    if (actualValue.data) {
      expect(actualValue.data.quoteOfTheDay).to.be.a('string');
    }
  });

  it('epicode', async () => {
    const query: string = `
      query {
        epicode
      }
    `;
    const actualValue: ExecutionResult<{ epicode: string }> = await graphql<{ epicode: string }>({
      schema,
      source: query,
      rootValue: resolvers
    });

    if (actualValue.data) {
      expect(actualValue.data.epicode).to.be.a('string');
    }
  });
});
