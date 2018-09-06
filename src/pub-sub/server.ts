import express from 'express';
import graphqlHTTP from 'express-graphql';
import { buildSchema, GraphQLSchema, GraphQLScalarType, ValueNode, Kind, ObjectFieldNode } from 'graphql';
import http from 'http';

import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';
import { logger } from '../util';
import { config } from '../config';
import { Pubsub } from './pubsub';

const schema: GraphQLSchema = buildSchema(typeDefs);

const GraphqlJSONType: GraphQLScalarType = new GraphQLScalarType({
  name: 'JSON',
  description: 'JSON type',
  serialize(value: any) {
    logger.info('serialize');
    return value;
  },
  parseValue(value: any) {
    logger.info('parseValue');
    return value;
  },
  parseLiteral(valueNode: ValueNode, variables) {
    if (valueNode.kind === Kind.OBJECT) {
      const json = {};
      valueNode.fields.forEach((field: ObjectFieldNode) => {
        json[field.name.value] = (field.value as any).value;
      });
      logger.info({ label: 'parseLiteral', msg: json });
      return json;
    }
    return null;
  }
});

Object.assign((schema as { _typeMap: any } & GraphQLSchema)._typeMap.JSON, GraphqlJSONType);

async function main(): Promise<http.Server> {
  const app: express.Application = express();
  const graphqlHTTPOptions: graphqlHTTP.Options = {
    schema,
    rootValue: resolvers,
    graphiql: true,
    context: {
      pubsub: new Pubsub()
    }
  };
  app.use(config.GRAPHQL_ROUTE, graphqlHTTP(graphqlHTTPOptions));
  return app.listen(config.PORT, () => {
    logger.info(`Running a GraphQL API server at ${config.GRAPHQL_ENDPOINT}`);
  });
}

if (process.env.NODE_ENV !== 'test') {
  main();
}

export { main };
