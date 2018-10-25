import { AnyAction } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { switchMap } from 'rxjs/operators';
import * as path from 'path'; 

import * as marketActions  from '../actions/market';
import * as constants from '../constants';
import fileManager, { FileObject} from '../FileManager';
import ipfs from '../IpfsStorage';

const marketDownloadAppEpic: Epic<AnyAction> = (action$) => action$.pipe(
  ofType(constants.MARKET_DOWNLOAD_DAPP),
  switchMap(async (action) => {
    try {
      const targetDirectory = path.join(__dirname, '..', '..', 'dapps', 'download');
      const downloadFiles: FileObject[] = await ipfs.downloadFolder(action.payload.ipfsHash);

      if (!downloadFiles) {
        throw Error('Folder with current hash does not exist');
      }
      
      fileManager.saveFolder(targetDirectory, downloadFiles);

      return marketActions.downloadDappSuccess(action.meta.sourceUUID);
    } catch(error) {
      return marketActions.downloadDappFailure(error, action.meta.sourceUUID);
    }
  }),
);

export default combineEpics(
  marketDownloadAppEpic
);
