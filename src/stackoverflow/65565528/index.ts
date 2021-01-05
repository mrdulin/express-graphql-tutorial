import { printSchema } from 'graphql';
import { loadSchemaSync, GraphQLFileLoader } from 'graphql-tools';
import { join } from 'path';

const localScheme = join(__dirname, './local.graphql');
const commonSchema = join(__dirname, './common/*.graphql');
console.log(localScheme);
console.log(commonSchema);
const schema = loadSchemaSync([localScheme, commonSchema], {
  loaders: [new GraphQLFileLoader()],
});

console.log(printSchema(schema));
