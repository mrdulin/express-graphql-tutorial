const typeDefs: string = `
  enum Episode {
    NEWHOPE
    EMPIRE
    JEDI
  }

  type Query {
    quoteOfTheDay: String
    random: Float!
    rollThreeDice: [Int]
    epicode: Episode
  }
`;

export { typeDefs };
