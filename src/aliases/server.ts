import express from 'express';
import graphqlHTTP from 'express-graphql';
import { buildSchema, GraphQLSchema } from 'graphql';
import http from 'http';
import { Done } from 'mocha';

import { logger } from '../util';
import { config } from '../config';
import { fakeDB } from './db';

const typeDefs: string = `
  type Hero {
    id: ID!
    name: String
  }
  type Query {
    hero(id: ID!): Hero
  }
`;

const schema: GraphQLSchema = buildSchema(typeDefs);

const root = {
  hero: ({ id }: { id: string }) => {
    return fakeDB.heroes.find((hero: any) => hero.id === id);
  }
};

function start(done?: Done): http.Server {
  const app: express.Application = express();
  app.use(
    config.GRAPHQL_ROUTE,
    graphqlHTTP({
      schema,
      rootValue: root,
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
