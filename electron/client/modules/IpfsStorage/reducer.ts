import * as constants from './constants';

import * as models from './models';

const initialState = {
  uploaded: [] as models.UploadedFileEntry[],
  uploads: [] as models.UploadsFileEntry[],
}

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
        uploads: state.uploads.map((upload) => {
          if (upload.id === action.payload.entryId) {
            return {
              ...upload,
              error: action.payload.error,
            };
          }

          return upload;
        }),
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

    default:
      return state;
  }
}
