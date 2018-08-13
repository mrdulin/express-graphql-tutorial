import { expect } from 'chai';
import { Done } from 'mocha';
import http from 'http';

import { start, schema } from './server';
import { rp, logger } from '../util';
import { IUser, IPost } from './db';
import { PostConnector, UserConnector } from './connectors';
import { graphql, ExecutionResult } from 'graphql';

let server: http.Server;
before('start server', (done: Done) => {
  server = start(done);
});

after('stop server', (done: Done) => {
  server.close(done);
});

describe('constructor types test suites', () => {
  const USER_ID1 = 'a';

  it('should return correct result for user query', async () => {
    const body = {
      query: `
        query user($id: ID!) {
          user(id: $id) {
            id
            name
            posts {
              id
              content
              author {
                id
                name
              }
            }
          }
        }
      `,
      variables: {
        id: USER_ID1
      }
    };

    const user: IUser | undefined = UserConnector.findUserById(USER_ID1);

    if (user) {
      const posts: IPost[] = PostConnector.findPostsByUserId(user.id).map(
        (post: IPost): IPost => ({ id: post.id, content: post.content })
      );

      const userResult: IUser & { posts: IPost[] } = {
        ...user,
        posts: posts.map((post: IPost) => {
          return {
            ...post,
            author: user
          };
        })
      };
      const actualValue = await rp(body);
      logger.info(actualValue);
      const expectValue = {
        data: {
          user: userResult
        }
      };

      expect(actualValue).to.eql(expectValue);
    }
  });

  it('should return users for users query', async () => {
    const body = {
      query: `
        query users {
          users{
            id
            name
          }
        }
      `
    };

    const actualValue = await rp(body);
    const expectValue = {
      data: {
        users: UserConnector.findAllUsers()
      }
    };

    expect(actualValue).to.eql(expectValue);
  });

  it('should throw an error when lack of "id" argument for user query', async () => {
    const body = {
      query: `
        query user{
          user {
            id
            name
          }
        }
      `
    };

    try {
      await rp(body);
    } catch (err) {
      expect(err).to.be.an.instanceof(Error);
      logger.error(err);
    }
  });

  it('should be return correct for user query using graphql', async () => {
    const query = `
      query user($id: ID!) {
        user(id: $id) {
          id
          name
        }
      }
    `;

    const actualValue: ExecutionResult<{ user: IUser }> = await graphql<{ user: IUser }>({
      schema,
      source: query,
      contextValue: {
        UserConnector
      },
      variableValues: {
        id: USER_ID1
      }
    });

    const expectValue: ExecutionResult<{ user: IUser }> = {
      data: {
        user: UserConnector.findUserById(USER_ID1) as IUser
      }
    };

    expect(actualValue).to.deep.equal(expectValue);
  });
});
