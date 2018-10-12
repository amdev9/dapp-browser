"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var IPFS = require("ipfs");
var IpfsComponent = /** @class */ (function () {
    function IpfsComponent(configuration) {
        var _this = this;
        this.status = false;
        this.url = 'https://ipfs.array.io/ipfs/';
        this.ipfs = new IPFS(configuration);
        // console.log('this.ipfs', this.ipfs)
        this.readyState = new Promise(function (resolve, reject) {
            _this.ipfs.on('ready', function () {
                if (_this.ipfs.isOnline()) {
                    console.log('online');
                    resolve();
                }
                else {
                    console.log('offline, try to start');
                    _this.ipfs.start();
                }
            });
        });
        this.ipfs.on('error', this.errorFunction.bind(this, Error));
        this.ipfs.on('start', this.startFunction.bind(this));
    }
    IpfsComponent.prototype.errorFunction = function (error) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.error('Something went terribly wrong!', error);
                return [2 /*return*/];
            });
        });
    };
    IpfsComponent.prototype.startFunction = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log('Node started!');
                return [2 /*return*/];
            });
        });
    };
    IpfsComponent.prototype.readyFunction = function () {
        return __awaiter(this, void 0, void 0, function () {
            var version;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.ipfs.isOnline()) {
                            console.log('online');
                            this.status = true;
                        }
                        else {
                            console.log('offline, try to start');
                            this.ipfs.start();
                        }
                        return [4 /*yield*/, this.ipfs.version()];
                    case 1:
                        version = _a.sent();
                        console.log('Version:', version.version);
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    IpfsComponent.prototype.uploadFilesMethod = function (pathsList) {
        return __awaiter(this, void 0, void 0, function () {
            var files, handler, options, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        files = pathsList.map(function (path) { return ({ path: path, content: fs.createReadStream(path) }); });
                        handler = function (p) { console.log(p); };
                        options = {
                            progress: handler
                        };
                        console.log('filesfunc', this.ipfs.files.add);
                        return [4 /*yield*/, this.ipfs.files.add(files, options)];
                    case 1:
                        result = _a.sent();
                        console.log('uploaded files', result, files);
                        return [2 /*return*/, result];
                }
            });
        });
    };
    IpfsComponent.prototype.uploadFiles = function (pathsList) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                // console.log('uploadFiles', this.ipfs)
                return [2 /*return*/, this.readyState.then(function () {
                        return _this.uploadFilesMethod(pathsList);
                    })];
            });
        });
    };
    IpfsComponent.prototype.downloadFile = function (hash) {
        console.log(this.url.concat(hash));
    };
    return IpfsComponent;
}());
var remoteConf = {
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
var localConf = {
    // repo: '/Users/pidgin/dev/boilerplate/ipfsTest',
    config: {
        Addresses: {
            API: "/ip4/127.0.0.1/tcp/5001",
        }
    }
};
var comp = new IpfsComponent(remoteConf);
exports.default = comp;
