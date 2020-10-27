const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema, print } = require('graphql');
const typeDefs = require('./types');

const app = express();
const port = 4000;
const schema = buildSchema(print(typeDefs));
console.log(print(typeDefs));

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
);

app.listen(port, () => console.log('Server started at port:', port));
