import { dialog } from 'electron';
import * as uuidv4 from 'uuid/v4';
import * as fs from 'fs';
import * as path from 'path';
import * as fse from 'fs-extra';

import { FileId, FileEntry, PathList, Path, FileObject, SavedFile } from './models';

export default class FileManager {
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

  static async saveFile(dir: Path, file: FileObject): Promise<SavedFile> {
    const location = path.join(dir, file.name);
    await fs.promises.writeFile(location, file.content);

    const stats = await fs.promises.lstat(location);

    return {
      fileId: FileManager.setPathEntry(location),
      path: location,
      size: stats.size,
      name: file.name,
    };
  }

  static async saveFolder(dir: Path, files: FileObject[]) {
    for (const file of files) {
      if (file.type === 'file') {
        await fse.outputFile(path.join(dir, file.path), file.content);
      }
    }
  }
}
