import * as fs from 'fs';
import * as path from 'path';
import * as extra from 'fs-extra';
import * as rimrafModule from 'rimraf';

import { isDev } from '../constants/globalVariables';

export const EXEC_TIMEOUT = 10000;

export const functionPromiseTimeout = (f: () => Promise<any>, timeout: number = EXEC_TIMEOUT): any => {
  if (!(f instanceof Function)) {
    throw Error('First argument is not a function');
  }

  return new Promise((resolve, reject) => {
    const result = f();

    if (!(result instanceof Promise)) {
      return result;
    }

    const timerId = setTimeout(() => {
      reject('Timeout error');
    }, timeout);

    result
      .then(resolve)
      .catch(reject)
      .finally(() => clearTimeout(timerId));
  });
};

export const checkExists = async (path: string): Promise<boolean> => {
  let flag;

  try {
    await fs.promises.access(path);
    flag = true;
  } catch (e) {
    flag = false;
  }
  return flag;
};

export const isDirectory = (dir: string) => new Promise((resolve, reject) => {
  fs.lstat(dir, (err, stats) => {
    if (err) {
      reject();
    }

    if (stats.isDirectory()) {
      resolve(true);
    } else {
      resolve(false);
    }
  });
});

export async function readDir(dir: string): Promise<any> {
  return new Promise((res: any, rej: any) => {
    fs.readdir(dir, async (err, data) => {
      if (err) {
        rej(err);
      } else {
        const dirList: string[] = [];

        const pathChecks = await data.map(async (dirName: string) => {
          const readDirPath = path.join(dir, dirName);
          const isDirectoryPath = await isDirectory(readDirPath);

          if (isDirectoryPath) {
            dirList.push(readDirPath);
          }
        });

        await Promise.all(pathChecks);

        res(dirList);
      }
    });
  });
}

export async function readFile(path: string, opts = 'utf8'): Promise<any> {
  return new Promise((res: any, rej: any) => {
    fs.readFile(path, opts, (err, data) => {
      if (err) rej(err);
      else res(data);
    });
  });
}

export async function copyFile(src: string, dist: string): Promise<any> {
  return new Promise((res: any, rej: any) => {
    fs.copyFile(src, dist, (err) => {
      if (err) {
        rej(err);
      }
      res();
    });
  });
}

export async function mkdir(folderPath: string): Promise<any> {
  return new Promise(async (res: any, rej: any) => {
    const checkExistFolderPath = await checkExists(folderPath);
    if (checkExistFolderPath) {
      res();
    }

    fs.mkdir(folderPath, (err) => {
      if (err) {
        rej(err);
      }
      res();
    });
  });
}

export async function mkdirp(folderPath: string): Promise<any> {
  const checkExistParentFolder = await checkExists(path.dirname(folderPath));
  if (!checkExistParentFolder) {
    const parentFolder = path.dirname(folderPath);
    await mkdirp(parentFolder);
  }

  await mkdir(folderPath);
}

export async function rimraf(path: string): Promise<any> {
  return new Promise((resolve, reject) => {
    rimrafModule(path, {}, (err) => {
      if (err) {
        reject(err);
      }

      resolve();
    });
  });
}

export async function copy(src: string, dest: string): Promise<any> {
  return new Promise((resolve, reject) => {
    extra.copy(src, dest, {}, (err) => {
      if (err) {
        reject(err);
      }

      resolve();
    });
  });
}

/** inspector module types */
declare var logger: Logger;

// export = Logger;

interface Logger {
  log(...args: any[]): void;

  error(...args: any[]): void;

  warn(...args: any[]): void;
}

interface Window {
  logger: Logger;
}

