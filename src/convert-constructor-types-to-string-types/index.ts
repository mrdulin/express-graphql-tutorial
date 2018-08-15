import { GraphQLObjectType, GraphQLString, printType } from 'graphql';

const Person = new GraphQLObjectType({
  name: 'Person',
  fields: () => ({
    name: {
      type: GraphQLString,
      description: 'Person name'
    }
  })
});

export { Person };
