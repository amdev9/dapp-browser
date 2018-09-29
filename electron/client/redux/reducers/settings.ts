import { TOGGLE_SETTINGS_PANEL } from '../constants';
import { SettingsPanelAction } from '../actions/settings';
import { SettingsPanel } from './state';
const initialState: SettingsPanel = {
  isOpen: false,
}
export default function settings(state: SettingsPanel = initialState, action: SettingsPanelAction) {
  switch (action.type) {
    case TOGGLE_SETTINGS_PANEL:
      if (action.payload && action.payload.hasOwnProperty('isOpen')) {
        return { ...state, isOpen: action.payload.isOpen };
      } else {
        return { ...state, isOpen: !state.isOpen };
      }

    default:
      return state;
  }
}
