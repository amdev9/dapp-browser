import * as constants from './constants';

import * as models from './models';

const initialState = {
  uploaded: [] as models.UploadedFileEntry[],
  uploads: [] as models.UploadsFileEntry[],
  downloaded: [] as models.DownloadedFileEntry[],
  downloads: [] as models.DownloadFileEntry[],
};

export default function reducer(state: models.IpfsStorageState = initialState, action: any) {
  switch (action.type) {
    case constants.CLIENT_UPLOADS_LIST_ENTRY_ADD:
      return {
        ...state,
        uploads: [...state.uploads, action.payload.entry],
      };

    case constants.CLIENT_UPLOADS_LIST_ENTRY_UPDATE_PROGRESS:
      return {
        ...state,
        uploads: state.uploads.map((upload) => {
          if (upload.id === action.payload.entryId) {
            return {
              ...upload,
              progress: action.payload.progress,
            };
          }

          return upload;
        }),
      };

    case constants.CLIENT_UPLOADS_LIST_ENTRY_SET_ERROR:
      return {
        ...state,
        uploads: state.uploads.filter((upload) => upload.id !== action.payload.entryId)
      };

    case constants.CLIENT_UPLOADS_LIST_ENTRY_DELETE:

      return {
        ...state,
        uploads: state.uploads.filter((entry) => entry.id !== action.payload.entryId),
      };

    case constants.CLIENT_UPLOADS_LIST_ENTRY_DELETE_ALL:

      return {
        ...state,
        uploads: [],
      };

    case constants.CLIENT_UPLOADED_LIST_FILE_ADD:
      return {
        ...state,
        uploaded: [action.payload.file, ...state.uploaded],
      };

    case constants.CLIENT_UPLOADED_LIST_DELETE_ALL:
      return {
        ...state,
        uploaded: [],
      };

    case constants.CLIENT_UPLOADED_LIST_SET_ALL_AS_READ:
      return {
        ...state,
        uploaded: state.uploaded.map((item) => ({
          ...item,
          shown: true,
        })),
      };

    case constants.CLIENT_DOWNLOAD_LIST_ENTRY_ADD:
      return {
        ...state,
        downloads: [...state.downloads, action.payload.entry]
      };

    case constants.CLIENT_DOWNLOAD_LIST_ENTRY_SET_ERROR:
      return {
        ...state,
        downloads: state.downloads.filter((download) => download.id !== action.payload.entryId)
      };

    case constants.CLIENT_DOWNLOAD_LIST_ENTRY_DELETE:

      return {
        ...state,
        downloads: state.downloads.filter((entry) => entry.id !== action.payload.entryId),
      };

    case constants.CLIENT_DOWNLOADED_LIST_ENTRY_ADD:
      return {
        ...state,
        downloaded: [action.payload.entry, ...state.downloaded],
      };

    case constants.CLIENT_DOWNLOADED_LIST_SET_ALL_AS_READ:
      return {
        ...state,
        downloaded: state.downloaded.map((item) => ({
          ...item,
          shown: true,
        })),
      };

    default:
      return state;
  }
}
