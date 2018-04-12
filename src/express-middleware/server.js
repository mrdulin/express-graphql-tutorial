const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    ip: String
  }
`);

const root = {
  ip: (args, req) => {
    return req.ip;
  }
};

function logIp(req, res, next) {
  console.log('ip: %s', req.ip);
  next();
}

const app = express();

app.use(logIp);
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
  })
);
const port = 4000;
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
