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
import { callbackify } from "util";

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
  preview: string;
  permissions: string[]
}

let _dapps: AppItem[] = [];
 
export class AppsManager {
  id: number;
  icon: string;
  permissions: any[];

  static getAppItem(appName: string) {
    // console.log('_dapps', _dapps, appName);
    const targetDapp = _dapps.find((item: AppItem) => item.appName == appName);
    const randomKey = Math.floor(Math.random() * 1000);

    return Object.assign({}, targetDapp, { 
      id: randomKey, 
      statusIcon: ["running"], //@todo add icon resolve
    });
  }

  static get dapps() {
    return _dapps;
  }

  static resolvePath(item: AppItem) {
    const icon = path.join(DAPPS_PATH, item.appName, item.icon);
    const preview = path.join(DAPPS_PATH, item.appName, item.preview);
    return {...item, icon, preview}
  }

  static async parseDapps() {
    try {
      const dappsFolders = await readDir(DAPPS_PATH);

      const promises = dappsFolders.map(async (file: any) => { //@todo rewrite with async lib
        try {
          const fileContent = await readFile(path.join(DAPPS_PATH, file, 'manifest.json'));
          const itemWithResolvedPath = AppsManager.resolvePath(JSON.parse(fileContent));
          // console.log(itemWithResolvedPath);
          AppsManager.dapps.push(itemWithResolvedPath); //@todo 1 add icon resolver
     
        } catch (err) {
          if(err instanceof SyntaxError) {
            console.log('Please check your js syntax: \n'); //@todo put it into console logs
            console.log(err);
          } else {
            console.log('other error: ', err);
          }
        }
      });
      await Promise.all(promises);


    } catch (err) {
      console.log('Catched' , err);
    }
  }
}

