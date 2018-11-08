import { MARKET_DOWNLOAD_DAPP_SUCCESS } from '../constants';
import { Feed } from './state';

// const initialState: Feed = {
//   items: []
// };

export default function feed(state: Feed = null, action: any) { //@todo refactor: fix action type
  switch (action.type) {
    case MARKET_DOWNLOAD_DAPP_SUCCESS:
      return {...state, items: [...state.items, action.payload.parsedDapp]};

    default:
      return state;
  }
}
