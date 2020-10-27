module.exports = `
type Event {
    _id: ID!
    title: String!
    description: String!
    price: Float!
    creator: User
}
`;
