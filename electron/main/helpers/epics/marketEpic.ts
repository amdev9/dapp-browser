import { AnyAction } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { switchMap } from 'rxjs/operators';
import * as path from 'path';

import * as marketActions  from '../actions/market';
import * as constants from '../constants';
import { FileObject, FileManager } from '../FileManager';
import ipfs from '../IpfsStorage';
import { AppsManager } from '../AppsManager';
import { DAPPS_PATH } from '../constants/appPaths';

const marketDownloadAppEpic: Epic<AnyAction> = (action$) => action$.pipe(
  ofType(constants.MARKET_DOWNLOAD_DAPP),
  switchMap(async (action) => {
    try {
      const targetDirectory = DAPPS_PATH;
      const downloadFiles: FileObject[] = await ipfs.downloadFolder(action.payload.ipfsHash);

      if (!downloadFiles) {
        throw Error('Folder with current hash does not exist');
      }

      await FileManager.saveFolder(targetDirectory, downloadFiles);
      const parsedDapp = await AppsManager.parseDapp(action.payload.ipfsHash);

      return marketActions.downloadDappSuccess(parsedDapp);
    } catch (error) {
      return marketActions.downloadDappFailure(error, action.meta.sourceUUID);
    }
  }),
);

export default combineEpics(
  marketDownloadAppEpic,
);
