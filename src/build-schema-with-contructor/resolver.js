const fakeDb = require('./db');

const root = {
  user: ({ id }) => {
    return fakeDb[id];
  }
};

module.exports = root;
