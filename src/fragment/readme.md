使用 grahpiql 查询，输入：

```graphql
query {
  lin: hero(id: "1") {
    ...UserFragment
  }
  echo: hero(id: "2") {
    ...UserFragment
  }
}

fragment UserFragment on Hero {
  name
  email
}
```

输出:

```graphql
{
  "data": {
    "lin": {
      "name": "lin",
      "email": "novaline@qq.com"
    },
    "echo": {
      "name": "echo",
      "email": "echo@qq.com"
    }
  }
}
```
