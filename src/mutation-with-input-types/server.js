const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const root = require('./resolver');

const app = express();
const port = 4000;
const schemaTemplate = `
  input MessageInput {
    content: String
    author: String
  }

  type Message {
    id: ID!
    content: String
    author: String
  }

  type Query {
    getMessage: String
  }

  type Mutation {
    createMessage(input: MessageInput): Message
    updateMessage(id: ID!, input: MessageInput): Message
  }
`;

const GRAPHQL_ROUTE = '/graphql';
const schema = buildSchema(schemaTemplate);

app.use(
  GRAPHQL_ROUTE,
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
  })
);

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}${GRAPHQL_ROUTE}`);
});
