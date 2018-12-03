import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

export interface IState {
  messages: MessagesState;
  rooms: RoomsState;
  main: MainState;
}

import messages, { MessagesState } from './messages';
import rooms, { RoomsState } from './rooms';
import main, { MainState } from './main';

export default combineReducers({
  messages,
  rooms,
  main,
  routing: routerReducer,
  form: formReducer,
});
