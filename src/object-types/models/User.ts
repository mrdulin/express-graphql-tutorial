import { Post } from './Post';
import { db, IUserModel } from '../db';

interface IUser extends IUserModel {
  posts: Post[] | [];
}

export class UserModel implements IUserModel {
  public id: string = '';
  public name: string = '';
  constructor(user?: UserModel) {
    if (user) {
      this.id = user.id;
      this.name = user.name;
    }
  }
}

export class User extends UserModel implements IUser {
  public static getById(id: string): User {
    const userModel: UserModel | undefined = db.users.find((user: UserModel) => user.id === id);
    if (userModel) {
      const posts: Post[] = Post.getByUserId(userModel.id);
      const user = new User(userModel, posts);
      return user;
    }
    return new User();
  }

  public posts: Post[] = [];

  constructor(user?: UserModel, posts?: Post[]) {
    super(user);
    if (posts) {
      this.posts = posts;
    }
  }
}
