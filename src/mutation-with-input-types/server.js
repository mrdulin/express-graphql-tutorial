const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const root = require('./resolver');
const config = require('../config');

const app = express();

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

const schema = buildSchema(schemaTemplate);

function start(done) {
  app.use(
    config.GRAPHQL_ROUTE,
    graphqlHTTP({
      schema,
      rootValue: root,
      graphiql: true
    })
  );
  return app.listen(config.PORT, () => {
    if (done) done();
    console.log(`Server is listening on http://localhost:${config.PORT}${config.GRAPHQL_ROUTE}`);
  });
}

if (process.env.NODE_ENV !== 'test') {
  start();
}

module.exports = start;
