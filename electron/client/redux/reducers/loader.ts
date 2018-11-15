import { ActionType } from 'typesafe-actions';
import { LoaderPanel } from './state';
import * as loaderActions from '../actions/loader';

export type LoaderPanelAction = ActionType<typeof loaderActions>;

export default function loader(state: LoaderPanel = null, action: LoaderPanelAction) {
  switch (action.type) {

    default:
      return state;
  }
}
