import { combineReducers } from 'redux';

import { permission } from './permission';
import { IState } from './state';

const rootReducer = combineReducers<IState>({
  permission
});

export default rootReducer;
