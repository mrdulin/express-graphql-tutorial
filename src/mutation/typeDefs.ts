const typeDefs: string = `
  type Mutation {
    setMessage(message: String): String
  }
  type Query {
    getMessage: String
  }
`;

export { typeDefs };
