import { db, IUser } from '../db';

interface IUserConnector {
  findUserById: (id?: string) => IUser | undefined;
  findAllUsers: () => IUser[];
}

const UserConnector: IUserConnector = {
  findUserById: (id?: string): IUser | undefined => {
    if (id) {
      return db.users.find((user: IUser): boolean => user.id === id);
    }
  },

  findAllUsers: (): IUser[] => {
    return db.users;
  }
};

export { UserConnector, IUserConnector };
