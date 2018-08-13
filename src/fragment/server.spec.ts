import { expect } from 'chai';
import http from 'http';
import { Done } from 'mocha';
import { pick } from 'lodash';

import { start, schema, rootValue } from './server';
import { rp, logger } from '../util';
import { IHero, findHeroById } from './db';
import { graphql, ExecutionResult } from 'graphql';

let server: http.Server;
before('start server', (done: Done) => {
  server = start(done);
});

after('stop server', (done: Done) => {
  server.close(done);
});

describe('fragment test suites', () => {
  const HERO_ID1 = '1';
  const HERO_ID2 = '2';

  it('should return correct value for query hero', async () => {
    const query: string = `
      query hero($id: ID!) {
        hero(id: $id) {
          id
          name
        }
      }
    `;

    const actualValue: ExecutionResult<{ hero: IHero }> = await graphql<{ hero: IHero }>({
      schema,
      source: query,
      rootValue,
      variableValues: {
        id: HERO_ID1
      }
    });

    const expectValue: ExecutionResult<{ hero: IHero }> = {
      data: {
        hero: pick(findHeroById(HERO_ID1), ['id', 'name']) as IHero
      }
    };

    expect(actualValue).to.deep.equal(expectValue);
  });

  it('should return correct value for query hero with request-promise', async () => {
    const query: string = `
      query hero($id: ID!) {
        hero(id: $id) {
          id
          name
        }
      }
    `;

    const body = {
      query,
      variables: {
        id: HERO_ID1
      }
    };

    const actualValue: ExecutionResult<{ hero: IHero }> = await rp(body);

    const expectValue: ExecutionResult<{ hero: IHero }> = {
      data: {
        hero: pick(findHeroById(HERO_ID1), ['id', 'name']) as IHero
      }
    };

    expect(actualValue).to.deep.equal(expectValue);
  });

  it('should return correct value for query hero with fragment', async () => {
    interface IExcutionResultData {
      lin: IHero;
      echo: IHero;
    }
    const subFields = ['name', 'email'];
    const query: string = `
      query {
        lin: hero(id: ${HERO_ID1}) {
          ...UserFragment
        }
        echo: hero(id: ${HERO_ID2}) {
          ...UserFragment
        }
      }
      fragment UserFragment on Hero {
        ${subFields.join('\n')}
      }
    `;

    const actualValue: ExecutionResult<IExcutionResultData> = await graphql<IExcutionResultData>({
      schema,
      source: query,
      rootValue
    });
    const expectValue: ExecutionResult<IExcutionResultData> = {
      data: {
        lin: pick(findHeroById(HERO_ID1), subFields) as IHero,
        echo: pick(findHeroById(HERO_ID2), subFields) as IHero
      }
    };

    expect(actualValue).to.deep.equal(expectValue);
  });
});
