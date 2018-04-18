const { GraphQLScalarType, GraphQLObjectType, GraphQLID, GraphQLString, Kind } = require('graphql');

const { fakeDB } = require('./db');

/**
 * 自定义scalar type
 */
const DateScalarType = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  parseValue(value) {
    return new Date(value);
  },
  serialize(value) {
    return value.getTime();
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return parseInt(ast.value, 10);
    }
    return null;
  }
});

/**
 * 定义Hero对象类型
 */
const HeroType = new GraphQLObjectType({
  name: 'Hero',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    birthday: { type: DateScalarType }
  }
});

/**
 * 定义入口Query对象类型
 */
const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    hero: {
      type: HeroType,
      args: {
        id: { type: GraphQLString }
      },
      resolve: (_, { id }) => {
        return fakeDB.heroes.find(hero => hero.id === id);
      }
    }
  }
});

const schema = {
  query: QueryType
};

module.exports = schema;
