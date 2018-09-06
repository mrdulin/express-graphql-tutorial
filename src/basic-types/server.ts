import express from 'express';
import graphqlHTTP from 'express-graphql';
import { buildSchema, GraphQLSchema } from 'graphql';

import { typeDefs } from './typeDefs';
import { logger } from '../util';
import { config } from '../config';
import { resolvers } from './resolvers';

const schema: GraphQLSchema = buildSchema(typeDefs);

function main() {
  const app: express.Application = express();
  const graphqlHTTPOptions: graphqlHTTP.Options = {
    schema,
    rootValue: resolvers,
    graphiql: true
  };
  app.use(config.GRAPHQL_ROUTE, graphqlHTTP(graphqlHTTPOptions));
  return app.listen(config.PORT, () => {
    logger.info(`Running a GraphQL API server at ${config.GRAPHQL_ENDPOINT}`);
  });
}

export { main, schema, resolvers };
