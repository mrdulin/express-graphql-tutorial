class Starship {
  constructor({ connector, data }) {
    this.connector = connector;
    this.data = data;
  }

  getById(id) {
    return this.connector.find({ id });
  }

  getName() {
    return this.data.name;
  }
}

module.exports = Starship;
