import { expect } from 'chai';
import http from 'http';
import { Done } from 'mocha';

import { start } from './server';
import { rp, logger } from '../util';
import { fakeDB } from './db';

let server: http.Server;
before('start server', (done: Done) => {
  server = start(done);
});

after('stop server', () => {
  server.close();
});

describe('aliases test suites', () => {
  const HERO_ID1 = '1';
  const HERO_ID2 = '2';

  it('should return correct query exeution result', async () => {
    const body = {
      query: `
        query {
          warHero: hero(id: ${HERO_ID1}) {
            id
            name
          }
          peaceHero: hero(id: ${HERO_ID2}) {
            id
            name
          }
        }
      `
    };

    const actualValue = await rp(body);
    logger.info({ label: 'actualValue', message: actualValue });
    const expectValue = {
      data: {
        warHero: fakeDB.heroes.find((hero: any) => hero.id === HERO_ID1),
        peaceHero: fakeDB.heroes.find((hero: any) => hero.id === HERO_ID2)
      }
    };
    expect(actualValue).to.eql(expectValue);
  });

  it('should return correct query execution result with operationName and variables', async () => {
    const body = {
      query: `
        query heroes($warHeroId: ID!, $peaceHeroId: ID!) {
          warHero: hero(id: $warHeroId) {
            id
            name
          }
          peaceHero: hero(id: $peaceHeroId) {
            id
            name
          }
        }
      `,
      variables: {
        warHeroId: HERO_ID1,
        peaceHeroId: HERO_ID2
      }
    };

    const actualValue = await rp(body);
    const expectValue = {
      data: {
        warHero: fakeDB.heroes.find((hero: any) => hero.id === HERO_ID1),
        peaceHero: fakeDB.heroes.find((hero: any) => hero.id === HERO_ID2)
      }
    };
    expect(actualValue).to.eql(expectValue);
  });
});
