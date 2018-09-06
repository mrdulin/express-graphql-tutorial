const resolvers = {
  publish: ({ channel, text }, { pubsub }) => {
    pubsub.publish(channel, text);
    return text;
  },
  subscribe: async ({ channel }, { pubsub }) => {
    const payload = await pubsub.subscribe(channel);
    return payload;
  }
};

export { resolvers };
