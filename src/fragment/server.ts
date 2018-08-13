import express from 'express';
import graphqlHTTP from 'express-graphql';
import { buildSchema, GraphQLSchema } from 'graphql';
import { Done } from 'mocha';
import http from 'http';

import { config } from '../config';
import { logger } from '../util';
import { db, IHero } from './db';

const schema: GraphQLSchema = buildSchema(`
  type Hero {
    id: ID!
    name: String
    email: String
  }
  type Query {
    hero(id: ID!): Hero
  }
`);

const rootValue = {
  hero: (parent: IHero) => {
    return db.heroes.find((hero: IHero): boolean => hero.id === parent.id);
  }
};

function start(done?: Done): http.Server {
  const app: express.Application = express();
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

export { start, schema, rootValue };
