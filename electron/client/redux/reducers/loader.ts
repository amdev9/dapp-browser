import { TOGGLE_LOADER_PANEL } from '../constants';
import { ActionType } from 'typesafe-actions';
import { LoaderPanel } from './state';
import * as loaderActions from '../actions/loader';

const initialState: LoaderPanel = {
  isOpen: false,
}
 
export type LoaderPanelAction = ActionType<typeof loaderActions>;

export default function loader(state: LoaderPanel = initialState, action: LoaderPanelAction) { //@todo combine loader, notfication, statusbar?
  switch (action.type) {
    case TOGGLE_LOADER_PANEL:
      if (action.payload && action.payload.hasOwnProperty('isOpen')) {
        return { ...state, isOpen: action.payload.isOpen };
      } else {
        return { ...state, isOpen: !state.isOpen };
      }

    default:
      return state;
  }
}
