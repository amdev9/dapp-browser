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
exports.__esModule = true;
var bitsharesjs_ws_1 = require("bitsharesjs-ws");
var bitsharesjs_1 = require("bitsharesjs");
var dynamicGlobal;
var globalWS;
function getWitnessByID(id) {
    return __awaiter(this, void 0, void 0, function () {
        var result, witness, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, bitsharesjs_ws_1.Apis.instance()
                            .db_api()
                            .exec('get_witnesses', [
                            [id]
                        ])];
                case 1:
                    witness = _a.sent();
                    return [4 /*yield*/, bitsharesjs_ws_1.Apis.instance()
                            .db_api()
                            .exec('get_full_accounts', [
                            [witness[0].witness_account], console.log()
                        ])];
                case 2:
                    result = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/, result[0][1]];
            }
        });
    });
}
function getData(ApiObject) {
    if (ApiObject) {
        return {
            block: {
                blockID: ApiObject.id,
                timestamp: ApiObject.timestamp,
                transactionsCount: ApiObject.transactions.length,
                witnessName: ApiObject.witnessName
            },
            transactions: {}
        };
    }
}
function getBlock(height) {
    if (height === void 0) { height = 1000; }
    return __awaiter(this, void 0, void 0, function () {
        var block, witness, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, bitsharesjs_ws_1.Apis.instance()
                            .db_api()
                            .exec('get_block', [height])];
                case 1:
                    block = _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.log(error_2);
                    return [2 /*return*/];
                case 3: return [4 /*yield*/, getWitnessByID(block.witness)];
                case 4:
                    witness = _a.sent();
                    block.id = height;
                    block.witnessName = witness.lifetime_referrer_name;
                    return [2 /*return*/, block];
            }
        });
    });
}
var blocks = [];
function getSerializedData() {
    return __awaiter(this, void 0, void 0, function () {
        var block;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dynamicGlobal = bitsharesjs_1["default"].getObject('2.1.0');
                    console.log("dynamicGlobal: ", dynamicGlobal);
                    globalWS = dynamicGlobal ? dynamicGlobal.toJS() : dynamicGlobal;
                    if (!globalWS) return [3 /*break*/, 2];
                    return [4 /*yield*/, getBlock(globalWS.head_block_number)];
                case 1:
                    block = _a.sent();
                    blocks.push(block);
                    return [2 /*return*/, getData(block)];
                case 2: return [2 /*return*/, null];
            }
        });
    });
}
var Network = /** @class */ (function () {
    function Network() {
        var _this = this;
        if (!Network.instance) {
            bitsharesjs_ws_1.Apis.instance('ws://hawking.array.io:8090/ws', true).init_promise.then(function (res) {
                bitsharesjs_1["default"].init().then(function () {
                    bitsharesjs_1["default"].subscribe(_this.broadcast);
                });
            })["catch"]();
            Network.instance = this;
        }
        return Network.instance;
    }
    Network.prototype.broadcast = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getSerializedData()];
                    case 1:
                        data = _a.sent();
                        console.log("broadcast data: ", data);
                        return [2 /*return*/];
                }
            });
        });
    };
    return Network;
}());
new Network();
module.exports = Network;
