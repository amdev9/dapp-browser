import { createSelector } from 'reselect';
import { IState } from '../../redux/reducers/state';

export const getUnshownUploadedFilesCounter = createSelector(
  (state: IState) => state.ipfsStorage.uploaded,
  (uploaded) => {
    const unshown = uploaded.filter(item => !item.shown);

    return unshown.length;
  },
);

export const getUnshownDownloadedFilesCounter = createSelector(
  (state: IState) => state.ipfsStorage.downloaded,
  (downloaded) => {
    const unshown = downloaded.filter(item => !item.shown);

    return unshown.length;
  },
);
