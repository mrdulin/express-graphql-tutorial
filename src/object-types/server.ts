import express from 'express';
import graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';
import http from 'http';
import { Done } from 'mocha';

import { config } from '../config';
import { logger } from '../util';

import { typeDefs } from './typeDefs';
import { rootValue } from './rootValue';

function start(done?: Done): http.Server {
  const app: express.Application = express();
  const schema = buildSchema(typeDefs);
  app.use(
    config.GRAPHQL_ROUTE,
    graphqlHTTP({
      schema,
      rootValue,
      graphiql: true
    })
  );
  return app.listen(config.PORT, () => {
    logger.info(`Running a GraphQL API server at ${config.GRAPHQL_ENDPOINT}`);
    if (done) {
      done();
    }
  });
}

if (process.env.NODE_ENV !== 'test') {
  start();
}

export { start };
