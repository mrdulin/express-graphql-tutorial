import { GraphQLSchema, buildSchema, graphql } from 'graphql';
import { loadDocumentsSync, GraphQLFileLoader } from 'graphql-tools';
import path from 'path';

const typeDefs: string = `
    type Author {
        id: ID!
        name: String
    }
    type Query {
        authors(ids: [ID]!): [Author]!
    }
`;
const resolvers = {
  authors({ ids }) {
    return [
      { id: ids[0], name: 'a' },
      { id: ids[1], name: 'b' },
    ];
  },
};

const schema: GraphQLSchema = buildSchema(typeDefs);

const query = loadDocumentsSync(path.resolve(__dirname, './query.graphql'), {
  loaders: [new GraphQLFileLoader()],
});

graphql({
  schema,
  source: query[0].rawSDL!,
  rootValue: resolvers,
  variableValues: { ids: [1337, 42] },
}).then(({ data }) => {
  console.log(data);
});
