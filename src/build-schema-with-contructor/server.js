const express = require('express');
const graphqlHTTP = require('express-graphql');
const graphql = require('graphql');

const { buildSchema } = graphql;

const root = require('./resolver');

const stringSchemaTemplate = require('./string-schema');
const objectSchemaTemplate = require('./object-schema');

const stringSchema = buildSchema(stringSchemaTemplate);
const objectSchema = new graphql.GraphQLSchema(objectSchemaTemplate);

const app = express();
app.use(
  '/graphql',
  graphqlHTTP({
    // objectSchema中的Query已经定义了resolver，本例子可以正常查询，使用new GraphQLSchema()创建带有resolver的schema，是否确定可以省略rootValue?
    schema: objectSchema,

    // schema: stringSchema,
    // rootValue: root,
    graphiql: true
  })
);
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
