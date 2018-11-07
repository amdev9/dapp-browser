import { combineReducers } from 'redux';
import { ActionType } from 'typesafe-actions';
import { permissionManager } from './permissionManager';

import * as permission from '../actions/permission';
import { IState } from './state';

export type PermissionAction = ActionType<typeof permission>;

const rootReducer = combineReducers<IState, PermissionAction>({
  permissionManager,
});

export default rootReducer;
