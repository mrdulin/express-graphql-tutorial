import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLSchemaConfig, GraphQLNonNull, GraphQLList } from 'graphql';
import { db, IPost, IUser } from './db';
import { IUserConnector, PostConnector } from './connectors';

const UserType: GraphQLObjectType = new GraphQLObjectType({
  name: 'User',

  // When two types need to refer to each other, or a type needs to refer to itself in a field,
  // you can use a function expression (aka a closure or a thunk) to supply the fields lazily.
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    posts: {
      type: new GraphQLList(PostType),
      resolve: (author: IUser): IPost[] => {
        return PostConnector.findPostsByUserId(author.id);
      }
    }
  })
});

const PostType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    author: {
      type: UserType,
      resolve: (_, args) => {
        return db.users[0];
      }
    }
  })
});

const QueryType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: UserType,
      description: 'query user by id',
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve: (_, { id }, ctx) => {
        return ctx.UserConnector.findUserById(id);
      }
    },
    users: {
      type: new GraphQLList(UserType),
      description: 'query all users',
      resolve: (_, args, ctx) => {
        return ctx.UserConnector.findAllUsers();
      }
    }
  }
});

const graphqlSchemaConfig: GraphQLSchemaConfig = {
  query: QueryType
};

export { graphqlSchemaConfig };
