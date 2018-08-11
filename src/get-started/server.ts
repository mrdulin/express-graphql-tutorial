import { graphql, buildSchema, GraphQLSchema, ExecutionResult } from 'graphql';

import { logger } from '../util';

const typeDefs: string = `
  type Query {
    hello: String
  }
`;

const schema: GraphQLSchema = buildSchema(typeDefs);

const root: any = {
  hello: (): string => 'Hello, World'
};

graphql(schema, '{hello}', root)
  .then((res: ExecutionResult) => {
    logger.info(res);
  })
  .catch((err: any) => logger.error(err));
