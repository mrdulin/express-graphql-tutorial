const typeDefs: string = `
  input MessageInput {
    content: String
    author: String
  }

  type Message {
    id: ID!
    content: String
    author: String
  }

  type Query {
    message(id: ID!): String
  }

  type Mutation {
    createMessage(message: MessageInput!): Message
    updateMessage(id: ID!, message: MessageInput!): Message
  }
`;

export { typeDefs };
