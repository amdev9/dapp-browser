import { combineEpics, Epic, ofType } from 'redux-observable';
import { map } from 'rxjs/operators';

import * as constants from './constants';
import * as actions from './actions';
import * as clientDappModels from 'ClientApp/modules/Dapp/models';
import * as clientDappActions from 'ClientApp/modules/Dapp/actions';

import { AppItem } from 'ClientApp/redux/model';
import DockManager from '../../helpers/systemComponents/DockManager';

const setMainTrayCounterEpic: Epic<any> = action$ => action$.pipe(
  ofType(constants.DAPP_SET_TRAY_COUNTER),
  map(action => actions.setMainTrayCounter(action.meta.name, action.payload.counter)),
);

const setClientTrayCounterEpic: Epic<any> = (action$, state$) => action$.pipe(
  ofType(constants.SET_MAIN_TRAY_COUNTER),
  map((action) => {
    const dappsCounterList: clientDappModels.DappsCounter[] = [];
    let allDappsCounter = 0;

    const dappsList = state$.value.tray.items.forEach((trayItem: AppItem) => {
      const counter = trayItem.counter || 0;
      allDappsCounter += counter;

      dappsCounterList.push({
        counter,
        dappName: trayItem.appName,
      });
    });

    const badge = allDappsCounter ? allDappsCounter.toString() : '';

    DockManager.setBadge(badge);
    return clientDappActions.setTrayCounters(dappsCounterList);
  }),
);

export default combineEpics(
  setMainTrayCounterEpic,
  setClientTrayCounterEpic,
);
