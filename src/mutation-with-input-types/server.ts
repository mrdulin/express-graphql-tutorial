import express from 'express';
import graphqlHTTP from 'express-graphql';
import { buildSchema, GraphQLSchema } from 'graphql';
import http from 'http';

import { resolvers } from './resolver';
import { config } from '../config';
import { typeDefs } from './typeDefs';
import { logger } from '../util';
import { db } from './db';

const schema: GraphQLSchema = buildSchema(typeDefs);

async function start(): Promise<http.Server> {
  const app: express.Application = express();
  app.use(
    config.GRAPHQL_ROUTE,
    graphqlHTTP((req: express.Request) => {
      return {
        schema,
        context: {
          db,
          req
        },
        rootValue: resolvers,
        graphiql: true
      };
    })
  );
  return app.listen(config.PORT, () => {
    logger.info(`Running a GraphQL API server at ${config.GRAPHQL_ENDPOINT}`);
  });
}

if (process.env.NODE_ENV !== 'test') {
  start();
}

export { start };
