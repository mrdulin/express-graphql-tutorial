import { expect } from 'chai';
import { printType } from 'graphql';

import { logger } from '../util';
import { Person } from './';

describe('test suites', () => {
  it('t-1', () => {
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
});
