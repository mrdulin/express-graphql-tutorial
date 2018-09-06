const resolvers = {
  setMessage: ({ message }, { db }) => {
    db.message = message;
    return message;
  },
  getMessage: (_, { db }) => {
    return db.message;
  }
};

export { resolvers };
