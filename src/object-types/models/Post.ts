import { User, UserModel } from './User';
import { db, IPostModel } from '../db';

interface IPost extends IPostModel {
  author: User;
}

export class PostModel implements IPostModel {
  public id: string = '';
  public title: string = '';
  public authorId: string = '';

  constructor(post?: PostModel) {
    if (post) {
      this.id = post.id;
      this.title = post.title;
      this.authorId = post.authorId;
    }
  }
}

export class Post extends PostModel implements IPost {
  public static getByUserId(id: string): Post[] {
    const userModel: UserModel | undefined = db.users.find((user: UserModel) => user.id === id);
    return db.posts.filter((postModel: PostModel) => postModel.authorId === id).map((postModel: PostModel) => {
      const post: Post = new Post(postModel, new User(userModel));
      return post;
    });
  }
  public author: User = new User();

  constructor(post?: PostModel, author?: User) {
    super(post);
    if (author) {
      this.author = author;
    }
  }
}
