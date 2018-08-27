import * as Bluebird from "bluebird";
// Bluebird as global Promise
declare global {
  export interface Promise<T> extends Bluebird<T> { }
  interface PromiseConstructor {
    delay: typeof Bluebird.prototype.delay;
  }
}

declare const Promise: any;

import * as path from 'path';
import * as fs from 'fs';
import {StatusBarItem} from "../../client/redux/model";

const DAPPS_PATH: string = path.join(__dirname, '..', '..', 'dapps', 'download');

async function readDir(path: string) {
  return new Promise((res: any, rej: any) => {
    fs.readdir(path, (err: Error, data: any) => {
      if (err) rej(err)
      else res(data)
    })
  })
}

async function readFile(path: string, opts = 'utf8') {
  return new Promise((res: any, rej: any) => {
    fs.readFile(path, opts, (err: Error, data: any) => {
      if (err) rej(err)
      else res(data)
    })
  })
}

async function stat(path: string) {
  return new Promise((res: any, rej: any) => {
    fs.stat(path, (err: Error, data: any) => {
      if (err) rej(err)
      else res(data)
    })
  })
}


// read contents of folder (for global folder)
// read contens of dapp folder


export type AppItem = {
   id?: number;
   appName: string;
   main: string;
   icon: string;
   statusIcon: string[];
}

export class AppsManager {
  private _appName: string;
  id: number;
  icon: string;
  permissions: any[];
  dapps: { [index: string]: AppItem; } = {};
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

  getAppItem(appName: string) {
    return this.dapps[appName];
  }
  getAllDappsForPreview() {
    return this.dapps;
  }
  async parseDapps() {
    console.log('parseDapps', this._appName);
    try {
      let files = await readDir(path.join(DAPPS_PATH, 'exampleDapp'));
      console.log(files);
    } catch (err) {
      console.log('Catched' , err);
    }

    console.log('parse manifest file');
    var filepath = path.join(DAPPS_PATH, 'exampleDapp', 'manifest.json');
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

  static sum(a: number, b: number) {
    return a + b;
  }

  async saveManifestData(file: string) {
    const fileContent = await readFile(path.join(DAPPS_PATH, file, 'manifest.json'));
    this.dapps[file] = JSON.parse(fileContent);
  }

  async processArray(array: any) {
    const promises = array.map((file: any) => this.saveManifestData(file));
    await Promise.all(promises);
    console.log('Done!');
  }

  async iterate2(dir?: string) {
    if (!dir) {
      dir = DAPPS_PATH;
    }
    const list = await readDir(dir);
    await this.processArray(list);
    console.log("list: ", list);
  }
}

