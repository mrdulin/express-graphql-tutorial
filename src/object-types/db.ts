import casual from 'casual';

interface IUserModel {
  id: string;
  name: string;
}

interface IPostModel {
  id: string;
  title: string;
  authorId: string;
}

interface IDb {
  users: IUserModel[];
  posts: IPostModel[];
}

const db: IDb = {
  users: [{ id: 'a', name: casual.name }, { id: 'b', name: casual.name }],
  posts: [
    { id: '1', title: casual.title, authorId: 'a' },
    { id: '2', title: casual.title, authorId: 'a' },
    { id: '3', title: casual.title, authorId: 'a' },
    { id: '4', title: casual.title, authorId: 'b' }
  ]
};

export { db, IUserModel, IPostModel };
