class Message {
  public id: string;
  public content: string;
  public author: string;

  constructor(data: Message) {
    this.id = data.id;
    this.content = data.content;
    this.author = data.author;
  }
}

export { Message };
