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

export class FileManager {
  entryMap: Map<FileId, Path> = new Map();

  static generateFileEntryId() {
    return uuidv4();
  }

  static async selectFile(): Promise<PathList> {
    return await dialog.showOpenDialog({ properties: ['openFile'] })
  }

  static async selectDirectory(): Promise<Path> {
     const paths = await dialog.showOpenDialog({ properties: ['openDirectory', 'createDirectory'] })

    if (!paths || !paths.length) {
      return
    }

    return paths[0]
  }

  _setPathEntry(path: Path): FileId {
    const pathId = FileManager.generateFileEntryId();
    this.entryMap.set(pathId, path);

    return pathId;
  }

  getPath(id: FileId): Path {
    if (!this.entryMap.has(id)) {
      return;
    }

    return this.entryMap.get(id)
  }

  async openFile(): Promise<FileEntry | undefined> {
    const file = await FileManager.selectFile()

    if (!file || !file.length) {
      return
    }

    return {
      id: this._setPathEntry(file[0]),
      name: path.basename(file[0])
    }
  }

  saveFile(dir: Path, file: FileObject) {

    const location = path.join(dir, file.name)

    fs.writeFileSync(location, file.content)

    return this._setPathEntry(location)
  }
}

export default new FileManager()
