export const remoteConfig = {
  start: true,
  EXPERIMENTAL: {
    pubsub: true,
  },
  config: {
    Bootstrap: [
      '/ip4/35.204.17.104/tcp/4001/ipfs/QmWCsxqpvYMKCeCejvXLc7TbWrraLwmAKMxWgcsKQ8xUL3',
    ],
    Addresses: {
      Swarm: [
        '/ip4/0.0.0.0/tcp/0',
        '/dns4/discovery.libp2p.array.io/tcp/9091/wss/p2p-websocket-star/',
      ],
      API: '/ip4/127.0.0.1/tcp/0',
      Gateway: '/ip4/0.0.0.0/tcp/0',
    },
  },
};

export const localConfig = {
  // repo: "/Users/pidgin/dev/boilerplate/ipfsTest",
  config: {
    Addresses: {
      API: '/ip4/127.0.0.1/tcp/5001',
    },
  },
};
