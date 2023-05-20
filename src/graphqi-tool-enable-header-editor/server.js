const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const root = {
  hello: () => {
    return 'Hello, World';
  }
};

const app = express();

app.use(
  '/graphql',
  graphqlHTTP((req) => {
    console.log('req.headers: ', req.headers)
    return {
      schema,
      rootValue: root,
      graphiql: { headerEditorEnabled: true }
    }
  })
);
const port = 4000;
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
