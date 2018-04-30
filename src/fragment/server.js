const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const fakeDB = {
  heroes: [{ id: '1', name: 'lin', email: 'novaline@qq.com' }, { id: '2', name: 'echo', email: 'echo@qq.com' }]
};

const schema = buildSchema(`
  type Hero {
    id: ID!
    name: String
    email: String
  }
  type Query {
    hero(id: ID!): Hero
  }
`);

const root = {
  hero: ({ id }, req, ctx) => {
    console.log(id, req, ctx);
    return fakeDB.heroes.find(hero => hero.id === id);
  }
};

const app = express();
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
  })
);
app.listen(4000, () => {
  console.log('Running a GraphQL API server at localhost:4000/graphql');
});
