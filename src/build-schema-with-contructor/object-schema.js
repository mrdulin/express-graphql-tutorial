const graphql = require('graphql');

const fakeDb = require('./db');

const userType = new graphql.GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: graphql.GraphQLString },
    name: { type: graphql.GraphQLString }
  }
});

const queryType = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: userType,
      args: {
        id: { type: graphql.GraphQLString }
      },
      resolve: (_, { id }) => {
        return fakeDb[id];
      }
    }
  }
});
const objectSchema = {
  query: queryType
};

module.exports = objectSchema;
