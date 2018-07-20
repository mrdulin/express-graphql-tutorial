const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const DataLoader = require('dataloader');

const fakeDB = {
  posts: [
    { id: '1', name: 'react book title', tags: ['1', '2'] },
    { id: '2', name: 'angular book title', tags: ['a', 'b', 'c'] }
  ],
  tags: [
    { id: '1', name: 'react' },
    { id: '2', name: 'reactjs' },
    { id: 'a', name: 'angular' },
    { id: 'b', name: 'ng' },
    { id: 'c', name: 'angularjs' }
  ]
};

const schema = buildSchema(`
  type Post {
    id: ID!
    name: String!
    tags: [Tag!]!
  }
  type Tag {
    id: ID!
    name: String!
  }
  type Query {
    posts: [Post]
  }
`);

function findInDB(cb) {
  setTimeout(cb, 1000);
}

class Post {
  constructor(opts) {
    this.id = opts.id;
    this.name = opts.name;
    this.tags = opts.tags;

    this.tagLoader = new DataLoader(this.getTags.bind(this));
  }

  getTags(ids) {
    if (!ids.length) return [];
    console.log('get tags');
    return new Promise(resolve => {
      findInDB(() => {
        const tags = ids
          .map(id => {
            console.log('get tag by tagId:', id);
            return fakeDB.tags.find(tag => tag.id === id);
          })
          .filter(x => x);
        resolve(tags);
      });
    });
  }
}

const root = {
  posts: () => {
    console.log('get posts');
    return fakeDB.posts.map(post => {
      const postInstance = new Post(post);
      return {
        id: post.id,
        name: post.name,
        tags: postInstance.getTags(post.tags)
      };
    });
  }

  // dataloader
  // posts: () => {
  //   console.log('get posts');
  //   return fakeDB.posts.map(post => {
  //     const postInstance = new Post(post);
  //     return {
  //       id: post.id,
  //       name: post.name,
  //       tags: postInstance.tagLoader.loadMany(post.tags)
  //     };
  //   });
  // }
};

const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
  })
);
const port = 4000;
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
