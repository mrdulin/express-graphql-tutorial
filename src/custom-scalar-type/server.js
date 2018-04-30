const express = require('express');
const graphqlHTTP = require('express-graphql');
const { GraphQLSchema } = require('graphql');

const schemaDefs = require('./schema');

const schema = new GraphQLSchema(schemaDefs);

const app = express();
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
);
app.listen(4000, () => {
  console.log('Running a GraphQL API server at localhost:4000/graphql');
});
