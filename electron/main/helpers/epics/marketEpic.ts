import { AnyAction } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { switchMap } from 'rxjs/operators';

import * as marketActions  from '../actions/market';
import * as constants from '../constants';
import { FileManager } from '../ducks/FileManager';
import { component as ipfs } from '../ducks/IpfsStorage';
import { AppsManager } from '../systemComponents/AppsManager';
import { DAPPS_PATH } from '../constants/appPaths';
import * as fs from 'fs';
import * as path from 'path';

const marketDownloadAppEpic: Epic<AnyAction> = action$ => action$.pipe(
  ofType(constants.MARKET_DOWNLOAD_DAPP),
  switchMap(async (action) => {
    try {
      const targetDirectory = DAPPS_PATH;
      const downloadFiles = await ipfs.downloadFolder(action.payload.ipfsHash);

      if (!downloadFiles) {
        throw Error('Folder with current hash does not exist');
      }

      await FileManager.saveFolder(targetDirectory, downloadFiles);

      fs.renameSync(path.join(targetDirectory, action.payload.ipfsHash), path.join(targetDirectory, 'Game'));
      const parsedDapp = await AppsManager.parseDapp('Game');
      return marketActions.downloadDappSuccess(parsedDapp);
    } catch (error) {
      return marketActions.downloadDappFailure(error, action.meta.sourceUUID);
    }
  }),
);

export default combineEpics(
  marketDownloadAppEpic,
);
