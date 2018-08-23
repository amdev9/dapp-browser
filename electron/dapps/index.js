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
var path = require('path');
var fs = require('fs');
function readDir(path) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (res, rej) {
                    fs.readdir(path, function (err, data) {
                        if (err)
                            rej(err);
                        else
                            res(data);
                    });
                })];
        });
    });
}
function readFile(path, opts) {
    if (opts === void 0) { opts = 'utf8'; }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (res, rej) {
                    fs.readFile(path, opts, function (err, data) {
                        if (err)
                            rej(err);
                        else
                            res(data);
                    });
                })];
        });
    });
}
// read contents of folder (for global folder)
// read contens of dapp folder
// export type AppItem = {
//   id?: number;
//   appName: string;
//   icon: string;
//   statusIcon: string[];
// }
var AppsManager = /** @class */ (function () {
    function AppsManager() {
        // list of Objects 
        this.id = 1; // auto generate identificator
        this.appName = '';
        this.icon = '';
        this.permissions = [];
        this.getAppItem = this.getAppItem.bind(this);
    }
    AppsManager.prototype.getAppItem = function (appName) {
        // return appItem
    };
    AppsManager.prototype.getAllDappsForPreview = function () {
        // return icons, etc. for home screen
    };
    AppsManager.prototype.parseDapps = function () {
        return __awaiter(this, void 0, void 0, function () {
            var files, err_1, filepath, fileContents, jsonFile, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('parseDapps', this.appName);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, readDir(path.join(__dirname, 'exampleDapp'))];
                    case 2:
                        files = _a.sent();
                        console.log(files);
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        console.log('Catched', err_1);
                        return [3 /*break*/, 4];
                    case 4:
                        console.log('parse manifest file');
                        filepath = path.join(__dirname, 'exampleDapp', 'manifest.json');
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, readFile(filepath)];
                    case 6:
                        fileContents = _a.sent();
                        jsonFile = JSON.parse(fileContents);
                        console.log(jsonFile);
                        return [3 /*break*/, 8];
                    case 7:
                        err_2 = _a.sent();
                        if (err_2 instanceof SyntaxError) {
                            console.log('Please check your js syntax: \n'); //@todo put it into console logs
                            console.log(err_2);
                        }
                        else {
                            console.log('other error: ', err_2);
                        }
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    return AppsManager;
}());
var manager = new AppsManager();
manager.parseDapps();
