const schemaString = `
  type User {
    id: String
    name: String
  }

  type Query {
    user(id: String): User
  }
`;

module.exports = schemaString;
