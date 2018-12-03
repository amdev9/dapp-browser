import * as constants from '../constants';

export interface MainState {
  isDappFocused: boolean;
}

const initialState: MainState = {
  isDappFocused: false,
};

export default (state: MainState = initialState, action: any) => {
  switch (action.type) {

    case constants.MAIN_SET_DAPP_FOCUSED:
      return {
        ...state,
        isDappFocused: true,
      };

    case constants.MAIN_RESET_DAPP_FOCUSED:
      return {
        ...state,
        isDappFocused: false,
      };

    default:
      return state;
  }
};
