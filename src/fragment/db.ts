interface IHero {
  id?: string;
  name?: string;
  email?: string;
}

const db = {
  heroes: [{ id: '1', name: 'lin', email: 'novaline@qq.com' }, { id: '2', name: 'echo', email: 'echo@qq.com' }]
};

const findHeroById = (id: string): IHero | undefined => {
  return db.heroes.find((hero: IHero): boolean => hero.id === id);
};

export { db, IHero, findHeroById };
