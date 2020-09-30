import { loadDocumentsSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import path from 'path';
import { separateOperations, print, buildSchema } from 'graphql';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import fetch from 'node-fetch';

const documents = loadDocumentsSync(path.resolve(__dirname, './queries.gql'), {
  loaders: [new GraphQLFileLoader()],
});
const { Something, SomethingElse } = separateOperations(documents[0].document!);

console.log(print(Something));
console.log(print(SomethingElse));

// server
const schema = buildSchema(`
  type User {
    id: ID!
    name: String
    email: String
    address: String
    phone: String
  }
  type Query {
    somethingelse(email: String!): User
    Something: User
  }
`);
const root = {
  somethingelse({ email }) {
    return { id: 1, name: 'teresa teng', email, address: 'Japan', phone: '123' };
  },
};
const app = express();
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }),
);
app.listen(4000, () => console.log('graphql server running on localhost 4000'));

// test
fetch('http://localhost:4000/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ query: print(SomethingElse), variables: { email: 'teresa.teng@gmail.com' } }),
})
  .then((res) => res.json())
  .then((res) => console.log(res))
  .catch(console.error);
