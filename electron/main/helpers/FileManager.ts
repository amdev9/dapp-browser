import { dialog, OpenDialogOptions } from 'electron';
import * as uuidv4 from 'uuid/v4';

export type FileEntryId = string;

export interface FileEntry {
  id: FileEntryId;
  path: string;
}
export type FileEntryList = Array<FileEntry>;
export type EntryIdsList = Array<string>;

const entryMap: Map<string, string> = new Map();

export class FileManager {

  static generateFileEntryId() {
    return uuidv4();
  }

  _setPathEntries(pathArray: Array<string> = []): EntryIdsList {
    return pathArray.map((path) => {
      const pathId = FileManager.generateFileEntryId();
      entryMap.set(pathId, path);

      return pathId;
    })
  }

  getPathEntries(idsArray: Array<string>): FileEntryList {
    const entries: FileEntryList = []



    idsArray.forEach((id: string): FileEntry => {
      if (!entryMap.has(id)){
        return
      }

      entries.push({ id, path: entryMap.get(id) })
    });

    return entries
  }

  async showOpenDialog(options: OpenDialogOptions = {properties: ['openFile', 'multiSelections']}) {
    let fileList = await dialog.showOpenDialog(options);
    return this._setPathEntries(fileList);
  }

}

