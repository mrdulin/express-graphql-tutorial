interface IUser {
  id: string;
  name: string;
}

interface IPost {
  id: string;
  content: string;
  authorId?: string;
}

const users: IUser[] = [{ id: 'a', name: 'lin' }, { id: 'b', name: 'echo' }];
const posts: IPost[] = [
  { id: '1', content: 'angular', authorId: 'a' },
  { id: '2', content: 'react', authorId: 'b' },
  { id: '3', content: 'graphql', authorId: 'b' }
];

const db = {
  users,
  posts
};

export { db, IUser, IPost };
