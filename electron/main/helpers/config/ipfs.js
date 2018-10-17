"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remoteConfig = {
    start: true,
    EXPERIMENTAL: {
        pubsub: true
    },
    config: {
        Bootstrap: [
            "/ip4/35.204.17.104/tcp/4001/ipfs/QmWCsxqpvYMKCeCejvXLc7TbWrraLwmAKMxWgcsKQ8xUL3"
        ],
        Addresses: {
            Swarm: [
                "/ip4/0.0.0.0/tcp/4001",
                "/ip6/::/tcp/4001",
                "/dns4/discovery.libp2p.array.io/tcp/9091/wss/p2p-websocket-star/"
            ],
            API: "/ip4/127.0.0.1/tcp/5001",
            Gateway: "/ip4/127.0.0.1/tcp/8080"
        }
    }
};
exports.localConfig = {
    // repo: '/Users/pidgin/dev/boilerplate/ipfsTest',
    config: {
        Addresses: {
            API: "/ip4/127.0.0.1/tcp/5001",
        }
    }
};
