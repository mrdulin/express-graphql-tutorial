const typeDefs: string = `
  scalar JSON

  type Query {
    publish(channel:String, text: JSON): JSON
    subscribe(channel: String): JSON
  }
`;

export { typeDefs };
