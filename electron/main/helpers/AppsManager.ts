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
import * as async from 'async';

/**/
 
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

export type AppItem = {
  
  id?: number;
  appName: string;
  main: string;
  icon: string;
  statusIcon: string[];
}

let _dapps: AppItem[] = [];
 
export class AppsManager {
  id: number;
  icon: string;
  permissions: any[];

  static getAppItem(appName: string) {
    console.log('_dapps', _dapps, appName);
    const targetDapp = _dapps.find((item: AppItem) => item.appName == appName);
    const randomKey = Math.floor(Math.random() * 1000);

    return Object.assign({}, targetDapp, { 
      id: randomKey, 
      statusIcon: ["runnning"] //@todo add icon resolve
    });
  }

  static get dapps() {
    return _dapps;
  }

  async parseDapps() {
    try {
      const dappsFolders = await readDir(DAPPS_PATH);
      console.log(dappsFolders);

 
      const promises = dappsFolders.map(async (file: any) => { //@todo rewrite with async lib
        try {
          const fileContent = await readFile(path.join(DAPPS_PATH, file, 'manifest.json'));
          AppsManager.dapps.push(JSON.parse(fileContent)); //@todo 1 add icon resolver
          //this.dapps[file] = JSON.parse(fileContent);   
        } catch (err) {
          if(err instanceof SyntaxError) {
            console.log('Please check your js syntax: \n'); //@todo put it into console logs
            console.log(err);
          } else {
            console.log('other error: ', err);
          }
        }
      })
      await Promise.all(promises);

    } catch (err) {
      console.log('Catched' , err);
    }
  }
}

