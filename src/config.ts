interface IOptions {
  HOST: string;
  PORT: string | number;
  GRAPHQL_ROUTE: string;
  GRAPHQL_ENDPOINT: string;
}
const config: IOptions = {
  HOST: process.env.HOST || 'localhost',
  PORT: process.env.PORT || 4000,
  GRAPHQL_ROUTE: '/graphql',
  GRAPHQL_ENDPOINT: ''
};

config.GRAPHQL_ENDPOINT = `http://${config.HOST}:${config.PORT}${config.GRAPHQL_ROUTE}`;

export { config };
