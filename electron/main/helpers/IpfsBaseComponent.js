"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var IPFS = require("ipfs");
var path = require("path");
var IpfsBaseComponent = /** @class */ (function () {
    function IpfsBaseComponent(configuration) {
        var _this = this;
        this.status = false;
        this.ipfs = new IPFS(configuration);
        IpfsBaseComponent.cleanLocks(configuration.repo || this.ipfs.repo.path());
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
            _this.ipfs.on('error', function (error) {
                reject(error);
            });
        });
    }
    IpfsBaseComponent.cleanLocks = function (repoPath) {
        // This fixes a bug on Windows, where the daemon seems
        // not to be exiting correctly, hence the file is not
        // removed.
        if (!repoPath) {
            return;
        }
        console.log('Cleaning repo.lock file');
        var lockPath = path.join(repoPath, 'repo.lock');
        if (fs.existsSync(lockPath)) {
            try {
                fs.unlinkSync(lockPath);
            }
            catch (err) {
                console.warn('Could not remove repo.lock. Daemon might be running');
            }
        }
    };
    return IpfsBaseComponent;
}());
exports.default = IpfsBaseComponent;
