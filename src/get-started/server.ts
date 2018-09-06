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

const query: string = `
  {
    hello
  }
`;

graphql<{ hello: string }>(schema, query, root)
  .then((res: ExecutionResult<{ hello: string }>) => {
    logger.info(res);
  })
  .catch((err: any) => logger.error(err));
