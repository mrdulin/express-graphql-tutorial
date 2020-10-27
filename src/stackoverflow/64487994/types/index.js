const { mergeTypeDefs } = require('@graphql-tools/merge');
const bookingType = require('./booking');
const userType = require('./user');
const eventType = require('./event');

const rootTypes = `
type RootQuery {
    events: [Event!]!
    users: [User!]!
    bookings: [Booking!]!
}

schema {
    query: RootQuery
}
`;

const types = [bookingType, userType, eventType, rootTypes];

module.exports = mergeTypeDefs(types);
