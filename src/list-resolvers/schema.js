exports.schemaDefs = `
  type Starship {
    id: ID!
    name: String
  }
  type Human {
    id: ID!
    starships: [Starship]
  }
  type Query {
    human(id: ID!): Human
  }
`;
