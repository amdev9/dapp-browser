import 'rxjs';
import { combineEpics, ofType, Epic } from 'redux-observable';
import { delay, mapTo, tap } from 'rxjs/operators';
import { Action } from 'redux';

import * as actions from '../actions/channel';

const insertContentIntoBlock = (content: string = '') => {
  const blockId = 'entryIdsBlock'
  const buttonId = 'openDialogButton'
  const blockElement = document.getElementById(blockId)
  const buttonElement = document.getElementById(buttonId)

  if (!content) {
    return
  }

  if (blockElement) {
    blockElement.innerText = content
  } else {
    const textElement = document.createElement('div');
    textElement.id = blockId
    textElement.innerText = content
    buttonElement.parentNode.insertBefore(textElement, buttonElement.nextSibling);
  }

}

const openChannelSuccess = () => ({ type: actions.OPEN_CHANNEL_SUCCESS });
 
const startCountdownEpic: Epic<Action> = action$ => action$.pipe(
  ofType(actions.OPEN_CHANNEL),
  mapTo(openChannelSuccess())
);

const fileManagerOpenSuccess: Epic<Action> = action$ => action$.pipe(
  ofType(actions.FILE_MANAGER_OPEN_DIALOG_SUCCESS),
  tap((action) => {
    insertContentIntoBlock(action.payload && action.payload.join(' '))
    console.log('OPEN SUCCESS', action)
  }),
  mapTo({ type: 'ANYTHING'})
);

const fileManagerOpenFailure: Epic<Action> = action$ => action$.pipe(
  ofType(actions.FILE_MANAGER_OPEN_DIALOG_FAILURE),
  tap((action) => console.log('OPEN FAILURE', action)),
  mapTo({ type: 'ANYTHING'})
);

export const rootEpic = combineEpics(
  startCountdownEpic,
  fileManagerOpenSuccess,
  fileManagerOpenFailure
);

//@todo add epic for channelId map save, add sendDataChannel with channelId
