import { User, Post } from './models';

const rootValue = {
  user: ({ id }: { id: string }) => {
    return User.getById(id);
  },
  postsByUserId({ id }: { id: string }) {
    return Post.getByUserId(id);
  }
};

export { rootValue };
