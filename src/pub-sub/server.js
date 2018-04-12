const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    publish(channel:String, text: String): String
    subscribe(channel: String): String
  }
`);

function newDeffer() {
  const deffer = {};
  deffer.promise = new Promise((resolve, reject) => {
    deffer.resolve = resolve;
    deffer.reject = reject;
  });
  return deffer;
}

const listener = [];

const root = {
  publish: ({ channel, text }) => {
    if (listener[channel]) {
      listener[channel].forEach(d => d.resolve(text));
      delete listener[channel];
    }
    return text;
  },
  subscribe: ({ channel }) => {
    const deffer = newDeffer();
    if (!listener[channel]) listener[channel] = [];
    listener[channel].push(deffer);
    return deffer.promise;
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
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
