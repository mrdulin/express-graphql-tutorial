class FakeDBConnector {
  constructor({ url }) {
    this.url = url;
    this.data = {
      starships: [
        { id: '1', name: 'lin' },
        { id: '2', name: 'echo' },
        { id: '3', name: 'du' },
        { id: '4', name: 'zhao' }
      ]
    };
  }
  find({ id }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const starshipFound = this.data.starships.find(starship => starship.id === id);
        resolve(starshipFound);
      }, 3000);
    });
  }
}

exports.FakeDBConnector = FakeDBConnector;
