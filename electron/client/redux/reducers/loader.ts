import { TOGGLE_LOADER_PANEL } from '../constants';
import { LoaderPanelAction } from '../actions/loader';
import { LoaderPanel } from './state';
const initialState: LoaderPanel = {
  isOpen: true,
}
export default function loader(state: LoaderPanel = initialState, action: LoaderPanelAction) {
  console.log(state)
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
