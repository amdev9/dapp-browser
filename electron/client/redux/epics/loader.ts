import 'rxjs';

import { combineEpics, ofType, Epic } from 'redux-observable';
import { delay, mergeMap, mapTo, map, ignoreElements } from 'rxjs/operators';
import { Action, AnyAction } from 'redux';
import { actions as IpfsStorageActions } from '../../modules/IpfsStorage';
import * as constants from '../constants';
import * as LoaderActions from '../actions/loader';

import StoreManager from '../../modules/StoreManager/component';

const openLoaderPanelEpic: Epic<AnyAction> = (action$, state$) => action$.pipe(
  ofType(constants.TOGGLE_LOADER_PANEL),
  map((action) => {
    console.log('toggleloaderpanel', state$.value.isOpen.loader)
    if (state$.value.isOpen.loader) {
      const activeTab = state$.value.loader.activeTab || constants.LOADER_TAB_UPLOAD;

      console.log('activetab', LoaderActions.setLoaderTab(activeTab))
      StoreManager.store.dispatch(LoaderActions.setLoaderTab(activeTab));
    }
  }),
  ignoreElements(),
);

const setLoaderTabEpic: Epic<AnyAction> = (action$, state$) => action$.pipe(
  ofType(constants.SET_LOADER_TAB),
  map((action) => {
    const { activeTab } = state$.value.loader;

    switch (activeTab) {
      case constants.LOADER_TAB_UPLOAD:
        StoreManager.store.dispatch(IpfsStorageActions.uploadedListSetAllAsRead());
        break;

      case constants.LOADER_TAB_DOWNLOAD:
        StoreManager.store.dispatch(IpfsStorageActions.downloadedListSetAllAsRead());
        break;
    }

  }),
  ignoreElements(),
);

export default combineEpics(
  openLoaderPanelEpic,
  setLoaderTabEpic,
);
