import casual from 'casual';

const resolvers = {
  quoteOfTheDay: () => {
    return casual.word;
  },
  random: () => {
    return Math.random();
  },
  rollThreeDice: () => {
    return [1, 2, 3].map(_ => 1 + Math.floor(Math.random() * 6));
  },
  epicode: () => {
    return ['NEWHOPE', 'EMPIRE', 'JEDI'][casual.integer(0, 2)];
  }
};

export { resolvers };
