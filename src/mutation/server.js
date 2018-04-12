const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const root = require('./resolver');

const app = express();
const port = 4000;
const schemaTemplate = `
  type Mutation {
    setMessage(message: String): String
  }
  type Query {
    getMessage: String
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
