const Starship = require('./models/Starship');

const root = {
  human: ({ id }, ctx) => {
    const starshipIds = ['1', '2', '3', '4'];
    return {
      id: '1',
      starships: () => {
        return starshipIds.map(starshipId => {
          return ctx.Starship.getById(starshipId).then(data => {
            const starship = new Starship({ data });
            console.log(starship.getName());
            // 查询不到starship{name}
            // return starship.getName();

            // 可以查询到starship{name}
            return starship.data;
          });
        });
      }
    };
  }
};

exports.root = root;
