import { ActionType } from 'typesafe-actions';
import { LoaderPanel } from './state';
import * as loaderActions from '../actions/loader';
import * as constants from '../constants';

export type LoaderPanelAction = ActionType<typeof loaderActions>;

const initialState = {
  activeTab: constants.LOADER_TAB_UPLOAD,
};

export default function loader(state: LoaderPanel = initialState, action: LoaderPanelAction) {
  switch (action.type) {
    case constants.SET_LOADER_TAB:
      return {
        ...state,
        activeTab: action.payload.tab,
      };

    default:
      return state;
  }
}
