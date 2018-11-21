import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

export interface IState {
  messages: MessagesState;
  rooms: RoomsState;
}

import messages, { MessagesState } from './messages';
import rooms, { RoomsState } from './rooms';

export default combineReducers({
  messages,
  rooms,
  routing: routerReducer,
  form: formReducer,
});
