import { dialog, OpenDialogOptions, app } from 'electron';
import * as uuidv4 from 'uuid/v4';
import * as fs from 'fs';
import * as path from 'path';

export type FileId = string;
export type Path = string;
export type FileName = string;

export interface FileEntry {
  id: FileId;
  path?: Path;
  name?: FileName;
}
export type FileEntryList = Array<FileEntry>;
export type FileIdList = Array<FileId>;
export type PathList = Array<Path>;

export interface FileObject {
  name: string;
  path: string;
  hash: Buffer | string;
  size: number;
  content?: Buffer;
}

const entryMap: Map<string, string> = new Map();

export class FileManager {

  static generateFileEntryId() {
    return uuidv4();
  }

  static async selectFile(): Promise<PathList> {
    return await dialog.showOpenDialog({ properties: ['openFile'] })
  }

  static async selectDirectory(): Promise<Path> {
     const paths = await dialog.showOpenDialog({ properties: ['openDirectory', 'createDirectory'] })

    if (!paths || paths.length === 0) {
      return
    }

    return paths[0]
  }

  static _setPathEntry(path: Path): FileId {
    const pathId = FileManager.generateFileEntryId();
    entryMap.set(pathId, path);

    return pathId;
  }

  _setPathEntries(pathArray: PathList = []): FileIdList {
    return pathArray.map(FileManager._setPathEntry.bind(this))
  }

  getPath(id: FileId): Path {
    if (!entryMap.has(id)) {
      return;
    }

    return entryMap.get(id)
  }

  async openFile(): Promise<FileEntry | undefined> {
    const file = await FileManager.selectFile()

    if (!file || !file.length) {
      return
    }

    return {
      id: FileManager._setPathEntry(file[0]),
      name: path.basename(file[0])
    }
  }

  static saveFile(dir: Path, file: FileObject) {

    const location = path.join(dir, file.name)

    fs.writeFileSync(location, file.content)

    return FileManager._setPathEntry(location)
  }

  static makeDir(dir: string) {
    fs.mkdirSync(dir)
  }

}

