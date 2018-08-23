//@todo move code to main process
import * as Bluebird from "bluebird";
// Bluebird as global Promise
declare global {
  export interface Promise<T> extends Bluebird<T> { }
  interface PromiseConstructor {
    delay: typeof Bluebird.prototype.delay;
  }
}

declare const Promise: any;

var path = require('path');
var fs = require('fs');


async function readDir(path) {
  return new Promise((res, rej) => {
    fs.readdir(path, (err, data) => {
      if (err) rej(err)
      else res(data)
    })
  })
}

async function readFile(path, opts = 'utf8') {
  return new Promise((res, rej) => {
    fs.readFile(path, opts, (err, data) => {
      if (err) rej(err)
      else res(data)
    })
  })
}


// read contents of folder (for global folder)
// read contens of dapp folder


// export type AppItem = {
//   id?: number;
//   appName: string;
//   icon: string;
//   statusIcon: string[];
// }

class AppsManager {
  private _appName: string;
  id: number;
  icon: string;
  permissions: any[];
  constructor() {
    this._appName = 'define first!';
    // list of Objects 
    // this.id = 1; // auto generate identificator
    // this.appName = '';
    // this.icon = '';
    // this.permissions = [];
    this.getAppItem = this.getAppItem.bind(this);
  }

  set appName(newName: string) {
    this._appName = newName; 
  }
  
  get appName(): string {
    return this._appName;
  }

  getAppItem(appName) {
    // return appItem
  }
  getAllDappsForPreview() {
    // return icons, etc. for home screen
  } 
  async parseDapps() {
    console.log('parseDapps', this._appName);
    try {
      let files = await readDir(path.join(__dirname, 'exampleDapp'));
      console.log(files);
    } catch (err) {
      console.log('Catched' , err);
    }

    console.log('parse manifest file');
    var filepath = path.join(__dirname, 'exampleDapp', 'manifest.json');
    try {
      let fileContents: any = await readFile(filepath);
      var jsonFile = JSON.parse(fileContents);
      console.log(jsonFile);

    } catch (err) {
      if(err instanceof SyntaxError) {
        console.log('Please check your js syntax: \n'); //@todo put it into console logs
        console.log(err);
      } else {
        console.log('other error: ', err);
      }
    }

    // put dapps abstractions into array
  }
}

let manager = new AppsManager();
 
manager.parseDapps();
manager.appName = "test";
console.log(manager.appName);
