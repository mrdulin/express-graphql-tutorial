import { expect } from 'chai';
import { printType, printSchema, buildSchema, GraphQLSchema } from 'graphql';

import { logger } from '../util';
import { Person } from './';

describe('test suites', () => {
  it('convert constructor types to string types', () => {
    const stringTypeDefs = printType(Person).replace(/\s/g, '');
    logger.info(printType(Person));

    const expectValue = `
      type Person {
        """Person name"""
        name: String
      }
    `.replace(/\s/g, '');
    expect(stringTypeDefs).to.be.equal(expectValue);
  });

  it('buildSchema', () => {
    const stringTypeDefs = printType(Person);
    const schema = buildSchema(stringTypeDefs);

    expect(schema).to.be.an.instanceof(GraphQLSchema);
  });

  it('printSchema', () => {
    const stringTypeDefs = printType(Person);

    const schema = printSchema(buildSchema(stringTypeDefs));

    logger.info(schema);

    const expectValue = `
      type Person {
        """Person name"""
        name: String
      }
    `.replace(/\s/g, '');

    expect(schema.replace(/\s/g, '')).to.be.eql(expectValue);
  });
});
