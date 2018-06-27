const fs = require('fs');
const {
  EOL,
  platform
} = require('os');

const {
  spawn
} = require('child_process');
const Frontend = require('./frontend');

const FrontEnd = new Frontend();

const RESPONSE_TIMEOUT = 1000;
const KEYCHAIN_CMD = (platform => {
    switch (platform) {
        case 'linux':
            return './keychain.ubuntu.16.04'
        case 'darwin':
	        return './keychain.macos'
	    case 'win32':
            return 'keychain.exe'
        default:
            throw Error(`platform unsupported: ${platform}`)
    }
})(platform())

const DEFAULT_KEY_PARAMS = { encrypted: true, algo: "CIPHER_AES256", curve: "CURVE_SECP256K1" }

class TaskQueue {
  constructor(concurrency) {
    this.concurrency = concurrency;
    this.running = 0;
    this.queue = [];
  }

  pushTask(task) {
    this.queue.push(task);
    this.next();
  }

  next() {
      while (this.running < this.concurrency && this.queue && this.queue.length) {
          const task = this.queue.shift();
          task.then(() => {
              this.running--;
              this.next();
          })
          this.running++;
      }
  }

};

var keychain = runKeychain();
var taskQueue = new TaskQueue(1);

function runKeychain() {
  return (function(p) {
    p.on('close', (code, signal) => {
      if (code !== null) {
        console.error(`keychain process exited with code: ${code}`);
      } else {
        console.error(`keychain process abnormally terminated by signal: ${signal}`);
      }
      keychain = runKeychain();
    });
    return p;
  })(spawn(KEYCHAIN_CMD));
}

function interact(request) {
  var p = new Promise((resolve, reject) => {
    const {
      stdin,
      stdout
    } = keychain;
    const cleanup = () => {
      stdin.removeListener('error', err);
      stdout.removeListener('error', err);
      stdout.removeListener('data', response);
    };

    const err = (err) => {
      cleanup();
      reject(err);
    };

    const response = (data) => {
      cleanup();
      resolve(JSON.parse(data.toString()));
    };

    stdin.addListener('error', err);
    stdout.addListener('error', err);
    stdout.addListener('data', response);

    setTimeout(() => {
      cleanup();
      keychain = runKeychain();
      reject('Response timeout');
    }, RESPONSE_TIMEOUT);

    keychain.stdin.write(request);
    keychain.stdin.write(EOL);
  });
  taskQueue.pushTask(p);
  return p;
}

class Keychain {
    async sign(response) {
        const request = JSON.stringify({
            command: "CMD_SIGN",
            params: response.payload.message
        });
        var output = await interact(request);

        response.payload.response = output
        FrontEnd.complete(response.payload)
    }

    async getList() {
        const request = JSON.stringify({
            command: 'CMD_LIST'
        });

        const {result} = await interact(request);

        return result;

    }

    async createKey(name) {
        const request = JSON.stringify({
	        command: "CMD_CREATE", params: { keyname: name, ...DEFAULT_KEY_PARAMS }
        });

	    const {result} = await interact(request);

        return result || false;
    }
}

module.exports = Keychain;
