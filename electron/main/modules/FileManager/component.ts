import { dialog } from 'electron';
import * as uuidv4 from 'uuid/v4';
import * as fs from 'fs';
import * as path from 'path';
import * as fse from 'fs-extra';

import { FileId, FileEntry, PathList, Path, FileObject } from './models';

export class FileManager {
  static entryMap: Map<FileId, Path> = new Map();

  static generateFileEntryId() {
    return uuidv4();
  }

  static async selectFile(): Promise<PathList> {
    return await dialog.showOpenDialog({ properties: ['openFile'] });
  }

  static async selectDirectory(): Promise<Path> {
    const paths = await dialog.showOpenDialog({ properties: ['openDirectory', 'createDirectory'] });
    if (!paths || paths.length === 0) {
      return;
    }
    return paths[0];
  }

  static setPathEntry(path: Path): FileId {
    const pathId = FileManager.generateFileEntryId();
    FileManager.entryMap.set(pathId, path);
    return pathId;
  }

  static getPath(id: FileId): Path {
    if (!FileManager.entryMap.has(id)) {
      return;
    }
    return FileManager.entryMap.get(id);
  }

  static async openFile(): Promise<FileEntry | undefined> {
    const file = await FileManager.selectFile();

    if (!file || !file.length) {
      return;
    }

    return {
      id: FileManager.setPathEntry(file[0]),
      name: path.basename(file[0]),
    };
  }

  static async saveFile(dir: Path, file: FileObject) {
    const location = path.join(dir, file.name);
    await fs.writeFile(location, file.content, (err) => {
      if (err) {
        console.warn(`unable to save file here: ${location}`);
      }
    });
    return FileManager.setPathEntry(location);
  }

  static async saveFolder(dir: Path, files: FileObject[]) {
    for (const file of files) {
      if (file.type === 'file') {
        await fse.outputFile(path.join(dir, file.path), file.content);
      }
    }
  }
}
