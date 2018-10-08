import { combineReducers } from 'redux';
import { ActionType } from 'typesafe-actions';
import { permission as permissionReducer } from './permission';

import * as permission from '../actions/permission';
import { IState } from './state';

export type PermissionAction = ActionType<typeof permission>;

const rootReducer = combineReducers<IState>({
  permissionReducer
});

export default rootReducer;
