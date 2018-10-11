import { dialog, OpenDialogOptions } from 'electron'
import * as uuidv4 from 'uuid/v4'

export interface FileEntry {
  id: string;
  path: string;
}
export type FileEntryList = Array<FileEntry>
export type EntryIdsList = Array<string>

const entryMap: Map<string, string> = new Map()

export class FileManager {

  static generateFileEntryId() {
    return uuidv4()
  }

  _setPathEntries(pathArray: Array<string> = []): EntryIdsList {
    return pathArray.map((path) => {
      const pathId = FileManager.generateFileEntryId()
      entryMap.set(pathId, path)

      return pathId
    })
  }

  getPathEntries(idsArray: Array<string>): FileEntryList {
    return idsArray.map((id: string): FileEntry => ({ id, path: entryMap.get(id) || '' }))
  }

  showOpenDialog(options: OpenDialogOptions = {properties: ['openFile', 'multiSelections']}): Promise<EntryIdsList> {
    return new Promise((resolve, reject) => {
      dialog.showOpenDialog(
        options,
        (fileList) => {
          resolve(this._setPathEntries(fileList))
        })
    })
  }

}

