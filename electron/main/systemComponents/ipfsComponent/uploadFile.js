"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const IPFS = require("ipfs");
class IpfsComponent {
    constructor(configuration) {
        this.status = false;
        this.ipfs = new IPFS(configuration);
        this.ipfs.on('ready', this.readyFunction.bind(this));
        this.ipfs.on('error', this.errorFunction.bind(this, Error));
        this.ipfs.on('start', this.startFunction.bind(this));
    }
    errorFunction(error) {
        return __awaiter(this, void 0, void 0, function* () {
            console.error('Something went terribly wrong!', error);
        });
    }
    startFunction() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Node started!');
        });
    }
    readyFunction() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.ipfs.isOnline()) {
                console.log('online');
                this.status = true;
            }
            else {
                console.log('offline, try to start');
                this.ipfs.start();
            }
            const version = yield this.ipfs.version();
            console.log('Version:', version.version);
            this.uploadFile();
        });
    }
    ;
    uploadFile() {
        var rstream = fs.createReadStream('uploadFile.ts');
        const files = [
            {
                path: '/upload.ts',
                content: rstream
            }
        ];
        const handler = (p) => { console.log(p); };
        const options = {
            progress: handler
        };
        this.ipfs.files.add(files, options, function (err, files) {
            if (err) {
                console.log(err);
            }
            console.log(files);
        });
    }
}
const remoteConf = {
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
const localConf = {
    // repo: '/Users/pidgin/dev/boilerplate/ipfsTest',
    config: {
        Addresses: {
            API: "/ip4/127.0.0.1/tcp/5001",
        }
    }
};
let ipfs = new IpfsComponent(localConf);
console.log(ipfs.status);
//# sourceMappingURL=uploadFile.js.map