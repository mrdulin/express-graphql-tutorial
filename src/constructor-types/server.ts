import express from 'express';
import graphqlHTTP, { OptionsResult } from 'express-graphql';
import { GraphQLSchema } from 'graphql';
import { Done } from 'mocha';
import http from 'http';

import { graphqlSchemaConfig } from './typeDefs';
import { config } from '../config';
import { logger } from '../util';
import { PostConnector, UserConnector } from './connectors';

const schema: GraphQLSchema = new GraphQLSchema(graphqlSchemaConfig);

function start(done?: Done): http.Server {
  const app: express.Application = express();
  app.use(
    config.GRAPHQL_ROUTE,
    graphqlHTTP(
      (req: express.Request): OptionsResult => {
        return {
          schema,
          context: {
            req,
            PostConnector,
            UserConnector
          },
          graphiql: true
        };
      }
    )
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
