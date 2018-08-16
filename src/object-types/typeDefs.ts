const typeDefs = `
  type User {
    id: ID!
    name: String!
    posts: [Post]!
  }

  type Post {
    id: ID!
    title: String!
    author: User!
  }

  type Query {
    user(id: ID!): User
    postsByUserId(id: ID!): [Post]!
    postById(id: ID!): Post
  }
`;

export { typeDefs };
