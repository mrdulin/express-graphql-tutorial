const fakeDb = {};

const root = {
  setMessage: ({ message }) => {
    fakeDb.message = message;
    return message;
  },
  getMessage: () => {
    return fakeDb.message;
  }
};

module.exports = root;
