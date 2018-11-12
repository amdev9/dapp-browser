import { TOGGLE_LOADER_PANEL } from '../constants';
import { ActionType } from 'typesafe-actions';
import { LoaderPanel } from './state';
import * as loaderActions from '../actions/loader';

const initialState: LoaderPanel = {
  isOpen: false,
};

export type LoaderPanelAction = ActionType<typeof loaderActions>;

export default function loader(state: LoaderPanel = initialState, action: LoaderPanelAction) {
  switch (action.type) {

    default:
      return state;
  }
}
