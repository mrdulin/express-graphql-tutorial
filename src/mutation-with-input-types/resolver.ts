import crypto from 'crypto';
import { Message } from './models/Message';

const resolvers = {
  getMessage: (root, { id }, { db }): Message => {
    return db.messages.find((message: Message): boolean => message.id === id);
  },
  createMessage: (root, { message }, { db }): Message => {
    const id = crypto.randomBytes(10).toString('hex');
    const msg = { id, ...message };
    db.messages.push(msg);
    return new Message(msg);
  },
  updateMessage: (root, { id, message }, { db }): Message => {
    const exists: boolean = !!db.messages.find((msg: Message): boolean => msg.id === id);
    if (!exists) {
      throw new Error(`No message exists with id ${id}`);
    }
    const data = { id, ...message };
    db.messages.push(data);
    return new Message(data);
  }
};

export { resolvers };
