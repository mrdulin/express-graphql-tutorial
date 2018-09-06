import express from 'express';
import graphqlHTTP from 'express-graphql';
import { buildSchema, GraphQLSchema } from 'graphql';
import http from 'http';

import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';
import { config } from '../config';
import { logger } from '../util';
import { db } from './db';

const schema: GraphQLSchema = buildSchema(typeDefs);

async function main(): Promise<http.Server> {
  const app: express.Application = express();
  const graphqlHttpOptions: graphqlHTTP.Options = {
    schema,
    context: {
      db
    },
    rootValue: resolvers,
    graphiql: true
  };
  app.use(config.GRAPHQL_ROUTE, graphqlHTTP(graphqlHttpOptions));

  return app.listen(config.PORT, () => {
    logger.info(`Server is listening on ${config.GRAPHQL_ENDPOINT}`);
  });
}

export { main, schema };
