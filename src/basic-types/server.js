const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema, graphql } = require('graphql');
const rp = require('request-promise');

const schema = buildSchema(`
  type Query {
    quoteOfTheDay: String
    random: Float!
    rollThreeDice: [Int]
  }
`);

const root = {
  quoteOfTheDay: () => {
    return Math.random() < 0.5 ? 'take it easy' : 'Salvation lies within';
  },
  random: () => {
    return Math.random();
  },
  rollThreeDice: () => {
    return [1, 2, 3].map(_ => 1 + Math.floor(Math.random() * 6));
  }
};

const app = express();
app.use(
  '/graphiql',
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
  })
);

app.get('/basictypes', (req, res) => {
  const { graphqlQuery } = req.query;
  if (!graphqlQuery) {
    return res.status(500).send('You must provide a query');
  }
  return graphql(schema, graphqlQuery, root)
    .then(response => response.data)
    .then(data => {
      return res.json(data);
    })
    .catch(err => {
      console.error(err);
      res.status(500).end(err.message);
    });
});

function clientRequest(query) {
  return rp({
    baseUrl: 'http://localhost:4000',
    uri: '/basictypes',
    qs: {
      graphqlQuery: query
    },
    resolveWithFullResponse: true,
    json: true
  });
}

app.listen(4000, () => {
  console.log('Running a GraphQL API server at localhost:4000/graphiql');

  setTimeout(() => {
    console.log('start request...');
    const query = `
      {
        quoteOfTheDay
      }
    `;
    clientRequest(query)
      .then(data => {
        console.log(data.body);
      })
      .catch(err => {
        console.error(err);
      });
  }, 2000);
});
