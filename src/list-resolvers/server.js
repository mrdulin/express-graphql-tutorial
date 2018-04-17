const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const { schemaDefs } = require('./schema');
const { root } = require('./resolver');

const { FakeDBConnector } = require('./connector');
const Starship = require('./models/Starship');

const schema = buildSchema(schemaDefs);

const app = express();
app.use(
  '/graphql',
  graphqlHTTP(req => {
    const fakeDBConnector = new FakeDBConnector({ url: 'fake db url' });
    return {
      schema,
      rootValue: root,
      graphiql: true,
      context: {
        Starship: new Starship({ connector: fakeDBConnector })
      }
    };
  })
);
app.listen(4000, () => {
  console.log('Running a GraphQL API server at localhost:4000/graphql');
});
