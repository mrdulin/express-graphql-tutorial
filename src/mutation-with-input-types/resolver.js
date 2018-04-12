const crypto = require('crypto');
const Message = require('./models/Message');

const fakeDb = {};

const root = {
  getMessage: () => {
    return fakeDb.message;
  },
  createMessage: ({ input }) => {
    const id = crypto.randomBytes(10).toString('hex');
    fakeDb[id] = input;
    return new Message(id, input);
  },
  updateMessage: ({ id, input }) => {
    if (!fakeDb[id]) {
      throw new Error('no message exists with id %d', id);
    }
    fakeDb[id] = input;
    return new Message(id, input);
  }
};

module.exports = root;
